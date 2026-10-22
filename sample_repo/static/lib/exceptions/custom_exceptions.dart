/// Kumpulan Custom Exception untuk Sistem Nilai Akademik
/// Mengikuti ketentuan Asesmen 1 DPPB (Tanpa kata kunci final)

/// Dilempar ketika nilai komponen berada di luar rentang 0 sampai 100
class NilaiDiLuarRentangException implements Exception {
  String pesan;
  NilaiDiLuarRentangException(
      [this.pesan = 'Nilai harus berada dalam rentang 0 sampai 100.']);

  @override
  String toString() => 'NilaiDiLuarRentangException: $pesan';
}

/// Dilempar ketika persentase kehadiran praktikum kurang dari batas minimal (75%)
class KehadiranKurangException implements Exception {
  String pesan;
  KehadiranKurangException(
      [this.pesan = 'Kehadiran praktikum kurang dari batas minimal 75%.']);

  @override
  String toString() => 'KehadiranKurangException: $pesan';
}

/// Dilempar ketika total SKS KRS mahasiswa melebihi batas maksimal 24 SKS
class SksMelebihiBatasException implements Exception {
  String pesan;
  SksMelebihiBatasException(
      [this.pesan = 'Total SKS yang diambil melebihi batas maksimal 24 SKS.']);

  @override
  String toString() => 'SksMelebihiBatasException: $pesan';
}

/// Dilempar ketika konversi SKS mata kuliah magang melebihi 20 SKS (Ketentuan Perempuan)
class KonversiSksException implements Exception {
  String pesan;
  KonversiSksException(
      [this.pesan = 'Konversi SKS magang tidak boleh melebihi 20 SKS.']);

  @override
  String toString() => 'KonversiSksException: $pesan';
}

/// Dilempar ketika mahasiswa mencoba melakukan remedial lebih dari satu kali (Ketentuan NIM Ganjil)
class RemedialDitolakException implements Exception {
  String pesan;
  RemedialDitolakException(
      [this.pesan = 'Remedial hanya dapat dilakukan maksimal 1 kali.']);

  @override
  String toString() => 'RemedialDitolakException: $pesan';
}
