import '../exceptions/custom_exceptions.dart';
import 'mata_kuliah.dart';

/// Subclass Mata Kuliah Magang (Ketentuan Perempuan)
/// Nilai mitra 60% dan dosen 40%, konversi SKS maksimal 20.
class MatkulMagang extends MataKuliah {
  MatkulMagang({
    required super.kode,
    required super.nama,
    required super.sks,
  }) {
    if (sks > 20) {
      throw KonversiSksException(
        'Konversi SKS magang untuk mata kuliah "$nama" tidak boleh melebihi 20 SKS (Diberikan: $sks SKS).',
      );
    }
  }

  @override
  double nilaiAkhir(Map<String, double> komponen) {
    validasiKomponen(komponen);

    double mitra = komponen['mitra'] ?? 0.0;
    double dosen = komponen['dosen'] ?? 0.0;

    return (0.60 * mitra) + (0.40 * dosen);
  }
}
