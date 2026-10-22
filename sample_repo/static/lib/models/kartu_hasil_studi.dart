import 'mahasiswa.dart';
import 'mata_kuliah.dart';
import 'matkul_seminar.dart';
import 'nilai.dart';

/// Class KartuHasilStudi (KHS)
/// Bertanggung jawab mengelola daftar nilai, menghitung IPS dengan fold,
/// menyimpan Set mata kuliah tidak lulus, serta menangani remedial dengan
/// try-catch-rethrow-finally dan pencatatan logError.
class KartuHasilStudi {
  Mahasiswa mahasiswa;
  List<Nilai> daftarNilai = [];
  List<String> logError = [];

  /// Map bobot huruf ke angka (Ketentuan 7)
  static const Map<String, double> bobotHuruf = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'E': 0.0,
  };

  KartuHasilStudi(this.mahasiswa);

  void tambahNilai(Nilai nilai) {
    daftarNilai.add(nilai);
  }

  /// Menghitung IPS menggunakan method fold (Ketentuan Asesmen)
  /// Aturan Khusus Seminar: SKS-nya dihitung, tetapi tidak masuk perhitungan IPS.
  double hitungIPS() {
    var matkulUntukIps =
        daftarNilai.where((n) => n.matkul is! MatkulSeminar).toList();

    if (matkulUntukIps.isEmpty) return 0.0;

    double totalBobotSks = matkulUntukIps.fold(
      0.0,
      (acc, n) => acc + ((bobotHuruf[n.nilaiHuruf] ?? 0.0) * n.matkul.sks),
    );

    int totalSksIps =
        matkulUntukIps.fold(0, (acc, n) => acc + n.matkul.sks);

    return totalSksIps > 0 ? (totalBobotSks / totalSksIps) : 0.0;
  }

  int get totalSksDiambil =>
      daftarNilai.fold(0, (acc, n) => acc + n.matkul.sks);

  int get totalSksLulus =>
      daftarNilai.where((n) => n.isLulus).fold(0, (acc, n) => acc + n.matkul.sks);

  Set<MataKuliah> get matkulTidakLulus {
    return daftarNilai
        .where((n) => !n.isLulus)
        .map((n) => n.matkul)
        .toSet();
  }

  void prosesRemedial(Nilai targetNilai, double nilaiBaru) {
    try {
      targetNilai.lakukanRemedial(nilaiBaru);
      print('  ✓ [REMEDIAL BERHASIL] Mata Kuliah ${targetNilai.matkul.nama} kini bernilai: ${targetNilai.nilaiAngka.toStringAsFixed(1)} (${targetNilai.nilaiHuruf})');
    } catch (e) {
      logError.add('[ERROR REMEDIAL - ${targetNilai.matkul.kode}] $e');
      print('  ✗ [CATAT ERROR] Dicatat ke logError: $e');
      rethrow;
    } finally {
      print('  📌 [FINALLY] Status akhir mata kuliah "${targetNilai.matkul.nama}": '
          'Nilai Akhir = ${targetNilai.nilaiAngka.toStringAsFixed(1)} '
          '(${targetNilai.nilaiHuruf}), Status = ${targetNilai.isLulus ? "LULUS" : "TIDAK LULUS"}');
    }
  }

  void cetakKHS() {
    print('=' * 75);
    print('                      KARTU HASIL STUDI (KHS)                      ');
    print('=' * 75);
    print('NIM           : ${mahasiswa.nim}');
    print('Nama          : ${mahasiswa.nama}');
    print('Jenis Kelamin : ${mahasiswa.jenisKelamin}');
    print('-' * 75);
    print(
      '${"No".padRight(4)}| '
      '${"Kode".padRight(8)}| '
      '${"Mata Kuliah".padRight(24)}| '
      '${"SKS".padRight(5)}| '
      '${"Angka".padRight(7)}| '
      '${"Huruf".padRight(7)}| '
      '${"Status"}',
    );
    print('-' * 75);

    int no = 1;
    for (var n in daftarNilai) {
      String kode = n.matkul.kode.padRight(8);
      String nama = (n.matkul.nama.length > 22
              ? '${n.matkul.nama.substring(0, 20)}..'
              : n.matkul.nama)
          .padRight(24);
      String sks = '${n.matkul.sks}'.padRight(5);
      String angka = n.nilaiAngka.toStringAsFixed(1).padRight(7);
      String huruf = n.nilaiHuruf.padRight(7);
      String status = n.isLulus ? 'LULUS' : 'TIDAK LULUS';

      print('${"$no.".padRight(4)}| $kode| $nama| $sks| $angka| $huruf| $status');
      no++;
    }

    print('-' * 75);
    print('Total SKS Diambil : $totalSksDiambil SKS');
    print('Total SKS Lulus   : $totalSksLulus SKS');
    print('IPS               : ${hitungIPS().toStringAsFixed(2)}');

    var gagal = matkulTidakLulus;
    if (gagal.isNotEmpty) {
      print('Mata Kuliah Belum Lulus (Set, tanpa duplikat):');
      for (var mk in gagal) {
        print(' - [${mk.kode}] ${mk.nama} (${mk.sks} SKS)');
      }
    } else {
      print('Semua mata kuliah LULUS! Luar biasa!');
    }
    print('=' * 75);
  }
}
