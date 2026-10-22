import { AssessmentQuiz } from '../types';

export const INITIAL_ASSESSMENT: AssessmentQuiz = {
  id: 'asesmen-1-dart-core',
  title: 'Mastery Assessment: Dart Academic System Architecture',
  subtitle: 'Rigorous 3-section evaluation on execution flow, domain invariants, exception handling, and functional aggregation.',
  codebaseName: 'Sistem Pengolahan Nilai Akademik (Dart OOP)',
  estimatedMinutes: 25,
  totalPoints: 100,
  mcqs: [
    {
      id: 'q1',
      number: 1,
      focusArea: 'Execution Flow',
      fileReference: 'lib/models/kartu_hasil_studi.dart',
      lineRange: 'lines 32-47',
      question:
        'In `KartuHasilStudi.hitungIPS()`, what is the architectural and mathematical effect when a student has registered for `MatkulSeminar` alongside regular lecture courses?',
      options: [
        {
          id: 'A',
          text: 'MatkulSeminar converts its "L" (Lulus) letter grade to a 4.0 numerical weight and includes its SKS in both numerator and denominator.',
        },
        {
          id: 'B',
          text: 'KartuHasilStudi throws an UnhandledException because MatkulSeminar does not produce standard A–E letter grades.',
        },
        {
          id: 'C',
          text: 'MatkulSeminar is excluded from both the total weighted grade points and the total SKS divisor via `where((n) => n.matkul is! MatkulSeminar)`, yet its SKS is still counted in `totalSksDiambil`.',
        },
        {
          id: 'D',
          text: 'The fold accumulator initializes with 0.0 and defaults missing grades to 2.0, diluting the student\'s final IPS score.',
        },
      ],
    },
    {
      id: 'q2',
      number: 2,
      focusArea: 'State Management',
      fileReference: 'lib/models/mahasiswa.dart',
      lineRange: 'lines 42-53',
      question:
        'A caller attempts to mutate a student\'s registered course list by executing `mahasiswa.krs.add(matkul)`. What occurs, and what is the underlying design mechanism protecting state integrity?',
      options: [
        {
          id: 'A',
          text: 'The course is appended normally because Dart lists are mutable references by default.',
        },
        {
          id: 'B',
          text: 'An UnsupportedError is thrown at runtime because `krs` returns `List.unmodifiable(_krs)`, forcing callers to use `tambahMatkul()` which enforces the 24 SKS invariant.',
        },
        {
          id: 'C',
          text: 'The compiler refuses to compile because `krs` is marked with the Dart `const` keyword.',
        },
        {
          id: 'D',
          text: 'The method silently rejects the addition and resets `totalSks` to 0 without warning.',
        },
      ],
    },
    {
      id: 'q3',
      number: 3,
      focusArea: 'Edge Cases',
      fileReference: 'lib/models/nilai.dart',
      lineRange: 'lines 29-51',
      question:
        'In `Nilai.lakukanRemedial(double nilaiBaru)`, assume an initial course score of 42.0 ("E"). If the student submits a remedial exam score of 95.0, what will be the resulting `nilaiAngka` and `nilaiHuruf` when accessed via getters?',
      options: [
        {
          id: 'A',
          text: 'nilaiAngka = 95.0, nilaiHuruf = "A"',
        },
        {
          id: 'B',
          text: 'nilaiAngka = 75.0, nilaiHuruf = "B"',
        },
        {
          id: 'C',
          text: 'A NilaiDiLuarRentangException is thrown because remedial scores cannot exceed 80.',
        },
        {
          id: 'D',
          text: 'nilaiAngka = 60.0, nilaiHuruf = "C" (due to the ternary cap `_nilaiSetelahRemedial = nilaiBaru > 60.0 ? 60.0 : nilaiBaru`)',
        },
      ],
    },
    {
      id: 'q4',
      number: 4,
      focusArea: 'Execution Flow',
      fileReference: 'lib/models/kartu_hasil_studi.dart',
      lineRange: 'lines 62-75',
      question:
        'When `khs.prosesRemedial(nilai, 75.0)` is executed for a course that has ALREADY undergone one remedial attempt (`jumlahRemedial == 1`), trace the exact control flow and side effects:',
      options: [
        {
          id: 'A',
          text: '`RemedialDitolakException` is thrown in `Nilai`, caught in KHS `catch (e)`, appended to `logError`, re-thrown via `rethrow;`, prints in `finally`, and must be handled by the caller in `main()`.',
        },
        {
          id: 'B',
          text: 'The exception is swallowed by KHS `catch` block, logged, and execution continues in `main()` without propagating upward.',
        },
        {
          id: 'C',
          text: 'The `finally` block is skipped because `rethrow;` terminates the Dart process immediately.',
        },
        {
          id: 'D',
          text: 'KHS resets `jumlahRemedial` to 0, retries the operation, and returns the previous letter grade.',
        },
      ],
    },
    {
      id: 'q5',
      number: 5,
      focusArea: 'Algorithms',
      fileReference: 'lib/services/sistem_akademik.dart',
      lineRange: 'lines 38-43',
      question:
        'In `SistemAkademik.hitungPeringkatKelas()`, what is the exact tie-breaking rule when two students achieve the identical IPS (e.g., both 3.00), such as Dewi Lestari and Bambang Sudarsono?',
      options: [
        {
          id: 'A',
          text: 'Ties are resolved non-deterministically based on internal hash map iteration order.',
        },
        {
          id: 'B',
          text: 'The student with higher total passed SKS is ranked first.',
        },
        {
          id: 'C',
          text: 'The comparator evaluates `a.mahasiswa.nim.compareTo(b.mahasiswa.nim)`, ranking the lower NIM higher in ascending order.',
        },
        {
          id: 'D',
          text: 'The student whose registration appeared first in the original input list retains priority.',
        },
      ],
    },
  ],
  essays: [
    {
      id: 'essay1',
      number: 1,
      category: 'Encapsulation & Domain Invariants',
      title: 'Architectural Defense: Unmodifiable Collections & Business Invariants',
      prompt:
        'In `lib/models/mahasiswa.dart`, the course registry is declared as a private list `List<MataKuliah> _krs = []`, and the public getter exposes `List<MataKuliah> get krs => List.unmodifiable(_krs);`. Explain why this defensive programming pattern was chosen instead of directly exposing `List<MataKuliah> krs`. How does this architectural choice guarantee that the 24 SKS limit cannot be bypassed, and what would happen if a consumer attempted to call `mahasiswa.krs.clear()` or `mahasiswa.krs.add(...)`?',
      relevantFiles: ['lib/models/mahasiswa.dart', 'lib/exceptions/custom_exceptions.dart'],
      keyArchitectureQuestions: [
        'Why avoid public mutable collection fields in domain models?',
        'How does `tambahMatkul()` guard the 24 SKS invariant?',
        'What runtime exception is raised when mutating an unmodifiable list in Dart?',
      ],
    },
    {
      id: 'essay2',
      number: 2,
      category: 'Functional Programming & Pipeline Aggregation',
      title: 'Functional Pipelines vs Imperative Loops in IPS Calculation',
      prompt:
        'Analyze `KartuHasilStudi.hitungIPS()` in `lib/models/kartu_hasil_studi.dart`. Why did the architect leverage Dart\'s higher-order function `.fold()` combined with `.where()` predicate filtering rather than imperative `for` loops with mutable accumulator variables? Discuss state immutability, reduction predictability, boundary handling (e.g. `matkulUntukIps.isEmpty`), and how the exclusion of `MatkulSeminar` is cleanly expressed in the pipeline.',
      relevantFiles: ['lib/models/kartu_hasil_studi.dart', 'lib/models/matkul_seminar.dart'],
      keyArchitectureQuestions: [
        'How does `.fold()` eliminate accumulator state leaks and off-by-one errors?',
        'Why is the `is! MatkulSeminar` filter crucial to academic regulations?',
        'How does division-by-zero prevention integrate into the calculation return expression?',
      ],
    },
    {
      id: 'essay3',
      number: 3,
      category: 'Polymorphism & Open-Closed Principle',
      title: 'Polymorphic Dispatch vs Centralized Type Switching in Course Evaluation',
      prompt:
        'The codebase contains multiple specialized course types: `MatkulTeori`, `MatkulPraktikum`, `MatkulProyek`, `MatkulSeminar`, and `MatkulMagang`, all extending abstract `MataKuliah`. Why is polymorphic method dispatch (`matkul.nilaiAkhir(komponen)`) architecturally superior to a monolithic procedural switch statement like `switch (matkul.runtimeType)` inside `SistemAkademik`? Under what circumstances does the Open-Closed Principle (OCP) benefit when a university introduces a new course type (e.g., `MatkulMBKM`)?',
      relevantFiles: [
        'lib/models/mata_kuliah.dart',
        'lib/models/matkul_teori.dart',
        'lib/models/matkul_praktikum.dart',
        'lib/models/matkul_magang.dart',
      ],
      keyArchitectureQuestions: [
        'How does subclass polymorphism localize component weighting rules?',
        'How would adding a new course type impact existing files under OCP?',
        'Where was type inspection still required and why was it an architectural exception?',
      ],
    },
  ],
  challenges: [
    {
      id: 'challengeA',
      type: 'bugfix',
      title: 'Challenge A (Bug Fix): Attendance Validation & Null Fallback in MatkulPraktikum',
      subtitle: 'Identify and fix the intentional bug where components are parsed unsafely and attendance is validated post-calculation.',
      targetFile: 'lib/models/matkul_praktikum.dart',
      scenario:
        'A junior engineer submitted a refactored version of `MatkulPraktikum.nilaiAkhir`. It contains two critical bugs: (1) It performs arithmetic before validating attendance, and (2) It relies on direct force unwrapping (`!`) on component keys instead of safe null-coalescing, causing unhandled runtime null exceptions when optional components are missing. Identify the defect and write the corrected method.',
      starterCode: `// BUGGY CODE SNIPPET FROM REFACTOR BRANCH
class MatkulPraktikum extends MataKuliah {
  double _kehadiran;

  MatkulPraktikum({
    required super.kode,
    required super.nama,
    required super.sks,
    double kehadiran = 100.0,
  }) : _kehadiran = kehadiran;

  // BUG DETECTED IN THIS METHOD:
  @override
  double nilaiAkhir(Map<String, double> komponen) {
    validasiKomponen(komponen);

    // Bug 1: Force unwrapping throws Null check operator error if key is absent
    double praktikum = komponen['praktikum']!;
    double laporan = komponen['laporan']!;
    double ujian = komponen['ujian']!;

    // Bug 2: Calculation occurs BEFORE checking attendance threshold
    double calculated = (0.50 * praktikum) + (0.20 * laporan) + (0.30 * ujian);

    double presensi = komponen['kehadiran'] ?? _kehadiran;
    if (presensi < 75.0) {
      throw KehadiranKurangException('Kehadiran praktikum kurang dari 75%!');
    }

    return calculated;
  }
}`,
      requirements: [
        'Check attendance threshold (>= 75.0%) BEFORE calculating any score.',
        'Use null-aware coalescing (`?? 0.0`) instead of force unwrapping (`!`).',
        'Preserve parameter inspection: check `komponen.containsKey("kehadiran") ? komponen["kehadiran"]! : _kehadiran`.',
        'Retain `validasiKomponen(komponen)` call at the beginning.',
      ],
      referenceSolution: `@override
double nilaiAkhir(Map<String, double> komponen) {
  validasiKomponen(komponen);

  double presensi = komponen.containsKey('kehadiran')
      ? komponen['kehadiran']!
      : _kehadiran;

  if (presensi < 75.0) {
    throw KehadiranKurangException(
      'Kehadiran mata kuliah praktikum "$nama" hanya \${presensi.toStringAsFixed(1)}%. Wajib minimal 75%!',
    );
  }

  double praktikum = komponen['praktikum'] ?? 0.0;
  double laporan = komponen['laporan'] ?? 0.0;
  double ujian = komponen['ujian'] ?? 0.0;

  return (0.50 * praktikum) + (0.20 * laporan) + (0.30 * ujian);
}`,
    },
    {
      id: 'challengeB',
      type: 'feature',
      title: 'Challenge B (Feature/Refactor): Implement Academic Honors Eligibility Predicate',
      subtitle: 'Extend the domain logic to determine Dean\'s List eligibility without mutating state.',
      targetFile: 'lib/models/kartu_hasil_studi.dart or lib/services/sistem_akademik.dart',
      scenario:
        'The university academic board has introduced a new requirement: identify whether a student qualifies for the "Dean\'s Honor Roll". A student is eligible if and only if:\n1. Total SKS taken is at least 12 SKS (`totalSksDiambil >= 12`).\n2. The student has 0 failed courses (`matkulTidakLulus.isEmpty`).\n3. The student\'s IPS is 3.75 or higher (`hitungIPS() >= 3.75`).\n4. The student has 0 remedial errors in their history (`logError.isEmpty`).\n\nImplement this method `bool isEligibleForHonorRoll()` as an extension or instance method on `KartuHasilStudi` following existing codebase patterns.',
      starterCode: `// IMPLEMENT THE HONOR ROLL ELIGIBILITY FEATURE
// Target: lib/models/kartu_hasil_studi.dart

extension HonorRollExtension on KartuHasilStudi {
  /// Evaluates whether this student qualifies for the Dean's Honor Roll.
  /// Criteria:
  /// - totalSksDiambil >= 12
  /// - matkulTidakLulus.isEmpty
  /// - hitungIPS() >= 3.75
  /// - logError.isEmpty
  bool isEligibleForHonorRoll() {
    // TODO: Implement the criteria check adhering to project patterns and null safety.
    return false;
  }
}`,
      requirements: [
        'Method must be pure and cause zero side-effects on student state.',
        'Must check `totalSksDiambil >= 12`.',
        'Must check `matkulTidakLulus.isEmpty`.',
        'Must check `hitungIPS() >= 3.75`.',
        'Must check `logError.isEmpty`.',
        'Return true only when all four criteria are strictly met.',
      ],
      referenceSolution: `extension HonorRollExtension on KartuHasilStudi {
  /// Evaluates whether this student qualifies for the Dean's Honor Roll.
  bool isEligibleForHonorRoll() {
    if (totalSksDiambil < 12) return false;
    if (matkulTidakLulus.isNotEmpty) return false;
    if (hitungIPS() < 3.75) return false;
    if (logError.isNotEmpty) return false;
    return true;
  }
}`,
    },
  ],
};
