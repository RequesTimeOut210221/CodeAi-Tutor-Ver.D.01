import 'mata_kuliah.dart';

/// Subclass Mata Kuliah Seminar (Ketentuan Laki-laki)
/// Hanya bernilai Lulus ("L") atau Tidak Lulus ("TL").
/// SKS-nya dihitung, tetapi tidak masuk perhitungan IPS.
class MatkulSeminar extends MataKuliah {
  MatkulSeminar({
    required super.kode,
    required super.nama,
    required super.sks,
  });

  @override
  double nilaiAkhir(Map<String, double> komponen) {
    validasiKomponen(komponen);

    double presentasi = komponen['presentasi'] ?? 0.0;
    double naskah = komponen['naskah'] ?? 0.0;

    return (0.50 * presentasi) + (0.50 * naskah);
  }

  @override
  String keHuruf(double angka) {
    return angka >= 55.0 ? 'L' : 'TL';
  }

  @override
  bool cekLulus(double nilai) {
    return keHuruf(nilai) == 'L';
  }
}
