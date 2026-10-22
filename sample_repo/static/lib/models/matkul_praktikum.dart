import '../exceptions/custom_exceptions.dart';
import 'mata_kuliah.dart';

/// Subclass Mata Kuliah Praktikum (Praktikum 50%, Laporan 20%, Ujian 30%, Kehadiran >= 75%)
class MatkulPraktikum extends MataKuliah {
  double _kehadiran;

  MatkulPraktikum({
    required super.kode,
    required super.nama,
    required super.sks,
    double kehadiran = 100.0,
  }) : _kehadiran = kehadiran;

  double get kehadiran => _kehadiran;
  set kehadiran(double value) {
    if (value < 0.0 || value > 100.0) {
      throw NilaiDiLuarRentangException(
          'Persentase kehadiran harus berada di rentang 0 sampai 100%.');
    }
    _kehadiran = value;
  }

  @override
  double nilaiAkhir(Map<String, double> komponen) {
    validasiKomponen(komponen);

    double presensi = komponen.containsKey('kehadiran')
        ? komponen['kehadiran']!
        : _kehadiran;

    if (presensi < 75.0) {
      throw KehadiranKurangException(
        'Kehadiran mata kuliah praktikum "$nama" hanya ${presensi.toStringAsFixed(1)}%. Wajib minimal 75%!',
      );
    }

    double praktikum = komponen['praktikum'] ?? 0.0;
    double laporan = komponen['laporan'] ?? 0.0;
    double ujian = komponen['ujian'] ?? 0.0;

    return (0.50 * praktikum) + (0.20 * laporan) + (0.30 * ujian);
  }
}
