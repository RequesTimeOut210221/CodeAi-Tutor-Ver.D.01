import 'mata_kuliah.dart';

/// Subclass Mata Kuliah Teori (Tugas 30%, UTS 30%, UAS 40%)
class MatkulTeori extends MataKuliah {
  MatkulTeori({
    required super.kode,
    required super.nama,
    required super.sks,
  });

  @override
  double nilaiAkhir(Map<String, double> komponen) {
    validasiKomponen(komponen);

    double tugas = komponen['tugas'] ?? 0.0;
    double uts = komponen['uts'] ?? 0.0;
    double uas = komponen['uas'] ?? 0.0;

    return (0.30 * tugas) + (0.30 * uts) + (0.40 * uas);
  }
}
