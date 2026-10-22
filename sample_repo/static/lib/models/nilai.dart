import '../exceptions/custom_exceptions.dart';
import 'mata_kuliah.dart';

/// Class Nilai (Menghubungkan MataKuliah, Komponen Nilai, dan Logika Remedial)
class Nilai {
  MataKuliah matkul;
  Map<String, double> komponen;
  int jumlahRemedial = 0;
  double? _nilaiSetelahRemedial;

  Nilai({
    required this.matkul,
    required this.komponen,
  });

  double get nilaiAngka {
    if (_nilaiSetelahRemedial != null) {
      return _nilaiSetelahRemedial!;
    }
    return matkul.nilaiAkhir(komponen);
  }

  double get nilaiAngkaAwal => matkul.nilaiAkhir(komponen);

  String get nilaiHuruf => matkul.keHuruf(nilaiAngka);

  bool get isLulus => matkul.cekLulus(nilaiAngka);

  void lakukanRemedial(double nilaiBaru) {
    if (nilaiBaru < 0.0 || nilaiBaru > 100.0) {
      throw NilaiDiLuarRentangException(
        'Nilai remedial ($nilaiBaru) harus berada dalam rentang 0 sampai 100.',
      );
    }

    if (nilaiAngkaAwal >= 55.0) {
      throw RemedialDitolakException(
        'Mata kuliah "${matkul.nama}" sudah lulus dengan nilai ${nilaiAngkaAwal.toStringAsFixed(1)}. Remedial hanya untuk nilai di bawah 55.',
      );
    }

    if (jumlahRemedial >= 1) {
      throw RemedialDitolakException(
        'Remedial untuk mata kuliah "${matkul.nama}" ditolak. Mahasiswa telah melakukan remedial sebanyak $jumlahRemedial kali.',
      );
    }

    // Nilai maksimal setelah remedial adalah 60
    _nilaiSetelahRemedial = nilaiBaru > 60.0 ? 60.0 : nilaiBaru;
    jumlahRemedial++;
  }

  @override
  String toString() =>
      '${matkul.nama}: ${nilaiAngka.toStringAsFixed(1)} ($nilaiHuruf) - ${isLulus ? "LULUS" : "TIDAK LULUS"}';
}
