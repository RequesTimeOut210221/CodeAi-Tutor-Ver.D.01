import '../interfaces/konversi.dart';
import '../exceptions/custom_exceptions.dart';

/// Abstract class MataKuliah
/// Memenuhi Ketentuan 1: Atribut kode, nama, SKS; method abstrak double nilaiAkhir(Map<String, double> komponen)
abstract class MataKuliah implements Konversi {
  String kode;
  String nama;
  int sks;

  MataKuliah({
    required this.kode,
    required this.nama,
    required this.sks,
  });

  /// Method abstrak untuk menghitung nilai akhir berdasarkan komponen
  double nilaiAkhir(Map<String, double> komponen);

  /// Validasi nilai agar berada di rentang 0 sampai 100
  void validasiKomponen(Map<String, double> komponen) {
    for (var entry in komponen.entries) {
      if (entry.value < 0.0 || entry.value > 100.0) {
        throw NilaiDiLuarRentangException(
          'Nilai komponen "${entry.key}" bernilai ${entry.value}. Harus di antara 0 sampai 100.',
        );
      }
    }
  }

  /// Konversi nilai angka ke huruf (A, B, C, D, E)
  @override
  String keHuruf(double angka) {
    if (angka >= 80.0) return 'A';
    if (angka >= 70.0) return 'B';
    if (angka >= 60.0) return 'C';
    if (angka >= 50.0) return 'D';
    return 'E';
  }

  /// Menentukan status kelulusan standar
  bool cekLulus(double nilai) {
    return nilai >= 55.0;
  }

  @override
  String toString() => '$kode - $nama ($sks SKS)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is MataKuliah &&
          runtimeType == other.runtimeType &&
          kode == other.kode;

  @override
  int get hashCode => kode.hashCode;
}
