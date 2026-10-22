import '../lib/exceptions/custom_exceptions.dart';
import '../lib/models/kartu_hasil_studi.dart';
import '../lib/models/mahasiswa.dart';
import '../lib/models/matkul_magang.dart';
import '../lib/models/matkul_praktikum.dart';
import '../lib/models/matkul_proyek.dart';
import '../lib/models/matkul_seminar.dart';
import '../lib/models/matkul_teori.dart';
import '../lib/models/nilai.dart';
import '../lib/services/sistem_akademik.dart';

void main() {
  print('''
╔════════════════════════════════════════════════════════════════════════════╗
║               SISTEM PENGOLAHAN NILAI AKADEMIK MAHASISWA                   ║
║                     PROYEK ASESMEN 1 - DPPB DART (STATIC)                  ║
╚════════════════════════════════════════════════════════════════════════════╝
''');

  // =========================================================================
  // 1. PENGUJIAN PENANGKAPAN EXCEPTION (Minimal 2 input tidak valid tertangkap)
  // =========================================================================
  print('=======================================================================');
  print('>>> 1. PENGUJIAN PENANGKAPAN INPUT TIDAK VALID (CUSTOM EXCEPTIONS) <<<');
  print('=======================================================================');

  // Kasus 1: Nilai di luar rentang (misal UAS = 115.0) -> NilaiDiLuarRentangException
  print('\n[Uji 1] Mencoba menginput nilai di luar rentang 0-100:');
  try {
    MatkulTeori matkulTeori = MatkulTeori(
      kode: 'CS101',
      nama: 'Pemrograman Berorientasi Objek',
      sks: 3,
    );
    Map<String, double> komponenInvalid = {'tugas': 80.0, 'uts': 75.0, 'uas': 115.0};
    print('  Input komponen: $komponenInvalid');
    matkulTeori.nilaiAkhir(komponenInvalid);
  } on NilaiDiLuarRentangException catch (e) {
    print('  ✓ Tertangkap Exception: $e');
  }

  // Kasus 2: Kehadiran praktikum kurang dari 75% -> KehadiranKurangException
  print('\n[Uji 2] Mencoba menghitung praktikum dengan kehadiran < 75%:');
  try {
    MatkulPraktikum matkulPrak = MatkulPraktikum(
      kode: 'CS102',
      nama: 'Praktikum Pemrograman Mobile',
      sks: 1,
      kehadiran: 60.0, // Kehadiran hanya 60%, minimal 75%
    );
    Map<String, double> komponenPrak = {'praktikum': 85.0, 'laporan': 80.0, 'ujian': 75.0};
    print('  Kehadiran: ${matkulPrak.kehadiran}% (Minimal 75%)');
    matkulPrak.nilaiAkhir(komponenPrak);
  } on KehadiranKurangException catch (e) {
    print('  ✓ Tertangkap Exception: $e');
  }

  // Kasus 3: Pengambilan SKS melebihi batas 24 SKS -> SksMelebihiBatasException
  print('\n[Uji 3] Mencoba mengambil KRS melebihi batas 24 SKS:');
  try {
    Mahasiswa mhsTest = Mahasiswa(nim: '6706220001', nama: 'Budi Santoso');
    print('  Menambahkan matkul 20 SKS...');
    mhsTest.tambahMatkul(MatkulTeori(kode: 'MK1', nama: 'Matkul Besar', sks: 20));
    print('  Total SKS saat ini: ${mhsTest.totalSks} SKS');
    print('  Mencoba menambah matkul 6 SKS lagi (Total akan jadi 26 SKS)...');
    mhsTest.tambahMatkul(MatkulTeori(kode: 'MK2', nama: 'Matkul Tambahan', sks: 6));
  } on SksMelebihiBatasException catch (e) {
    print('  ✓ Tertangkap Exception: $e');
  }

  // Kasus 4: Konversi SKS Magang melebihi 20 SKS (Ketentuan Perempuan) -> KonversiSksException
  print('\n[Uji 4] Mencoba konversi SKS Magang lebih dari 20 SKS:');
  try {
    print('  Mencoba membuat MatkulMagang dengan 22 SKS...');
    MatkulMagang(
      kode: 'INT401',
      nama: 'Magang Industri Full-Semester',
      sks: 22,
    );
  } on KonversiSksException catch (e) {
    print('  ✓ Tertangkap Exception: $e');
  }

  // =========================================================================
  // 2. KHS MAHASISWA (Minimal 4 Mata Kuliah dengan Nilai, Huruf, Status, IPS)
  // =========================================================================
  print('\n=======================================================================');
  print('>>> 2. PEMBUATAN & PENCETAKAN KARTU HASIL STUDI (KHS) <<<');
  print('=======================================================================');

  Mahasiswa mhsUtama = Mahasiswa(
    nim: '6706220031',
    nama: 'Ikhwan Pratama',
    jenisKelamin: 'Laki-laki',
  );

  MatkulTeori mkTeori = MatkulTeori(
    kode: 'D3SI01',
    nama: 'Pemrograman Bergerak',
    sks: 3,
  );

  MatkulPraktikum mkPraktikum = MatkulPraktikum(
    kode: 'D3SI02',
    nama: 'Praktikum Pemrograman Bergerak',
    sks: 1,
    kehadiran: 85.0,
  );

  MatkulProyek mkProyek = MatkulProyek(
    kode: 'D3SI03',
    nama: 'Proyek Aplikasi Bergerak',
    sks: 3,
  );

  MatkulSeminar mkSeminar = MatkulSeminar(
    kode: 'D3SI04',
    nama: 'Seminar Inovasi Teknologi',
    sks: 2,
  );

  MatkulTeori mkBasisData = MatkulTeori(
    kode: 'D3SI05',
    nama: 'Sistem Basis Data Lanjut',
    sks: 3,
  );

  mhsUtama.tambahMatkul(mkTeori);
  mhsUtama.tambahMatkul(mkPraktikum);
  mhsUtama.tambahMatkul(mkProyek);
  mhsUtama.tambahMatkul(mkSeminar);
  mhsUtama.tambahMatkul(mkBasisData);

  KartuHasilStudi khsUtama = KartuHasilStudi(mhsUtama);

  Nilai nilaiTeori = Nilai(
    matkul: mkTeori,
    komponen: {'tugas': 85.0, 'uts': 80.0, 'uas': 85.0},
  );

  Nilai nilaiPraktikum = Nilai(
    matkul: mkPraktikum,
    komponen: {'praktikum': 80.0, 'laporan': 75.0, 'ujian': 80.0},
  );

  Nilai nilaiProyek = Nilai(
    matkul: mkProyek,
    komponen: {'proposal': 90.0, 'progres': 85.0, 'demo': 90.0},
  );

  Nilai nilaiSeminar = Nilai(
    matkul: mkSeminar,
    komponen: {'presentasi': 80.0, 'naskah': 85.0},
  );

  Nilai nilaiBasisData = Nilai(
    matkul: mkBasisData,
    komponen: {'tugas': 40.0, 'uts': 45.0, 'uas': 40.0},
  );

  khsUtama.tambahNilai(nilaiTeori);
  khsUtama.tambahNilai(nilaiPraktikum);
  khsUtama.tambahNilai(nilaiProyek);
  khsUtama.tambahNilai(nilaiSeminar);
  khsUtama.tambahNilai(nilaiBasisData);

  print('\n>>> KHS SEBELUM REMEDIAL:');
  khsUtama.cetakKHS();

  // =========================================================================
  // 3. KETENTUAN NIM GANJIL: ALUR REMEDIAL, LOG ERROR, RETHROW, & FINALLY
  // =========================================================================
  print('\n=======================================================================');
  print('>>> 3. DEMONSTRASI REMEDIAL (KETENTUAN KHUSUS NIM GANJIL) <<<');
  print('=======================================================================');
  print('Mata kuliah yang belum lulus: ${nilaiBasisData.matkul.nama}');
  print('Nilai saat ini: ${nilaiBasisData.nilaiAngka.toStringAsFixed(1)} (di bawah 55, berhak remedial)');

  print('\n--- [Remedial Ke-1] Melakukan remedial dengan nilai ujian 85.0 (Maks 60) ---');
  khsUtama.prosesRemedial(nilaiBasisData, 85.0);

  print('\n--- [Remedial Ke-2] Mencoba remedial kedua (Harus melempar RemedialDitolakException) ---');
  try {
    khsUtama.prosesRemedial(nilaiBasisData, 75.0);
  } on RemedialDitolakException catch (e) {
    print('  ✓ Exception tertangkap di main setelah di-rethrow: $e');
  }

  print('\nIsi logError di KartuHasilStudi:');
  for (var log in khsUtama.logError) {
    print('  📝 $log');
  }

  print('\n>>> KHS SETELAH REMEDIAL:');
  khsUtama.cetakKHS();

  // =========================================================================
  // 4. KETENTUAN NIM GENAP: PERINGKAT KELAS MINIMAL 5 MAHASISWA & PREDIKAT
  // =========================================================================
  print('\n=======================================================================');
  print('>>> 4. DEMONSTRASI PERINGKAT KELAS (KETENTUAN KHUSUS NIM GENAP) <<<');
  print('=======================================================================');

  Mahasiswa m1 = Mahasiswa(nim: '6706220010', nama: 'Ahmad Fauzi');
  Mahasiswa m2 = Mahasiswa(nim: '6706220002', nama: 'Siti Rahma', jenisKelamin: 'Perempuan');
  Mahasiswa m3 = Mahasiswa(nim: '6706220018', nama: 'Bambang Sudarsono');
  Mahasiswa m4 = Mahasiswa(nim: '6706220004', nama: 'Dewi Lestari', jenisKelamin: 'Perempuan');
  Mahasiswa m5 = Mahasiswa(nim: '6706220022', nama: 'Cahyo Nugroho');

  KartuHasilStudi khs1 = KartuHasilStudi(m1);
  khs1.tambahNilai(Nilai(matkul: mkTeori, komponen: {'tugas': 95.0, 'uts': 90.0, 'uas': 95.0})); // A
  khs1.tambahNilai(Nilai(matkul: mkPraktikum, komponen: {'praktikum': 90.0, 'laporan': 90.0, 'ujian': 90.0})); // A
  khs1.tambahNilai(Nilai(matkul: mkProyek, komponen: {'proposal': 95.0, 'progres': 90.0, 'demo': 95.0})); // A
  khs1.tambahNilai(Nilai(matkul: mkSeminar, komponen: {'presentasi': 90.0, 'naskah': 90.0})); // L

  MatkulMagang mkMagang = MatkulMagang(kode: 'MGN01', nama: 'Magang Industri', sks: 4);
  KartuHasilStudi khs2 = KartuHasilStudi(m2);
  khs2.tambahNilai(Nilai(matkul: mkTeori, komponen: {'tugas': 80.0, 'uts': 75.0, 'uas': 75.0})); // B
  khs2.tambahNilai(Nilai(matkul: mkPraktikum, komponen: {'praktikum': 85.0, 'laporan': 80.0, 'ujian': 80.0})); // A
  khs2.tambahNilai(Nilai(matkul: mkMagang, komponen: {'mitra': 85.0, 'dosen': 80.0})); // A
  khs2.tambahNilai(Nilai(matkul: mkSeminar, komponen: {'presentasi': 80.0, 'naskah': 80.0})); // L

  KartuHasilStudi khs3 = KartuHasilStudi(m3); // NIM 6706220018
  khs3.tambahNilai(Nilai(matkul: mkTeori, komponen: {'tugas': 70.0, 'uts': 70.0, 'uas': 70.0})); // B (3.0)
  khs3.tambahNilai(Nilai(matkul: mkPraktikum, komponen: {'praktikum': 70.0, 'laporan': 70.0, 'ujian': 70.0})); // B (3.0)
  khs3.tambahNilai(Nilai(matkul: mkProyek, komponen: {'proposal': 70.0, 'progres': 70.0, 'demo': 70.0})); // B (3.0)
  khs3.tambahNilai(Nilai(matkul: mkSeminar, komponen: {'presentasi': 70.0, 'naskah': 70.0})); // L

  KartuHasilStudi khs4 = KartuHasilStudi(m4); // NIM 6706220004
  khs4.tambahNilai(Nilai(matkul: mkTeori, komponen: {'tugas': 70.0, 'uts': 70.0, 'uas': 70.0})); // B (3.0)
  khs4.tambahNilai(Nilai(matkul: mkPraktikum, komponen: {'praktikum': 70.0, 'laporan': 70.0, 'ujian': 70.0})); // B (3.0)
  khs4.tambahNilai(Nilai(matkul: mkProyek, komponen: {'proposal': 70.0, 'progres': 70.0, 'demo': 70.0})); // B (3.0)
  khs4.tambahNilai(Nilai(matkul: mkSeminar, komponen: {'presentasi': 70.0, 'naskah': 70.0})); // L

  KartuHasilStudi khs5 = KartuHasilStudi(m5);
  khs5.tambahNilai(Nilai(matkul: mkTeori, komponen: {'tugas': 65.0, 'uts': 60.0, 'uas': 65.0})); // C (2.0)
  khs5.tambahNilai(Nilai(matkul: mkPraktikum, komponen: {'praktikum': 75.0, 'laporan': 70.0, 'ujian': 75.0})); // B (3.0)
  khs5.tambahNilai(Nilai(matkul: mkProyek, komponen: {'proposal': 65.0, 'progres': 60.0, 'demo': 65.0})); // C (2.0)
  khs5.tambahNilai(Nilai(matkul: mkSeminar, komponen: {'presentasi': 75.0, 'naskah': 70.0})); // L

  List<DataMahasiswaIps> daftarDataIps = [
    DataMahasiswaIps(mahasiswa: m1, khs: khs1),
    DataMahasiswaIps(mahasiswa: m2, khs: khs2),
    DataMahasiswaIps(mahasiswa: m3, khs: khs3),
    DataMahasiswaIps(mahasiswa: m4, khs: khs4),
    DataMahasiswaIps(mahasiswa: m5, khs: khs5),
  ];

  Map<String, List<Mahasiswa>> mapPredikat = SistemAkademik.hitungPeringkatKelas(daftarDataIps);

  SistemAkademik.cetakKelompokPredikat(mapPredikat);

  print('\n=======================================================================');
  print('>>> SELURUH PENGUJIAN DAN KETENTUAN ASESMEN 1 TELAH TERPENUHI! <<<');
  print('=======================================================================');
}
