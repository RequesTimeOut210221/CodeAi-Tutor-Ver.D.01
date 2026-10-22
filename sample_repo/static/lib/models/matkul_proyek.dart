import 'mata_kuliah.dart';

/// Subclass Mata Kuliah Proyek (Proposal 20%, Progres 30%, Demo 50%)
class MatkulProyek extends MataKuliah {
  MatkulProyek({
    required super.kode,
    required super.nama,
    required super.sks,
  });

  @override
  double nilaiAkhir(Map<String, double> komponen) {
    validasiKomponen(komponen);

    double proposal = komponen['proposal'] ?? 0.0;
    double progres = komponen['progres'] ?? 0.0;
    double demo = komponen['demo'] ?? 0.0;

    return (0.20 * proposal) + (0.30 * progres) + (0.50 * demo);
  }
}
