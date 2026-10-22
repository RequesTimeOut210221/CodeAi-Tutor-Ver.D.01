import '../exceptions/custom_exceptions.dart';
import 'mata_kuliah.dart';

/// Class Mahasiswa (NIM private dengan validasi, daftar KRS bertipe List<MataKuliah>)
class Mahasiswa {
  String _nim = '';
  String _nama = '';
  String _jenisKelamin = 'Laki-laki';
  List<MataKuliah> _krs = [];

  Mahasiswa({
    required String nim,
    required String nama,
    String jenisKelamin = 'Laki-laki',
  }) {
    this.nim = nim; // memanfaatkan setter untuk validasi
    _nama = nama;
    _jenisKelamin = jenisKelamin;
  }

  String get nim => _nim;
  set nim(String val) {
    val = val.trim();
    if (val.isEmpty) {
      throw ArgumentError('NIM tidak boleh kosong.');
    }
    if (!RegExp(r'^\d+$').hasMatch(val)) {
      throw ArgumentError('NIM harus berupa deretan angka: "$val"');
    }
    if (val.length < 3) {
      throw ArgumentError('NIM minimal memiliki panjang 3 digit.');
    }
    _nim = val;
  }

  String get nama => _nama;
  set nama(String val) => _nama = val;

  String get jenisKelamin => _jenisKelamin;
  set jenisKelamin(String val) => _jenisKelamin = val;

  List<MataKuliah> get krs => List.unmodifiable(_krs);

  int get totalSks => _krs.fold(0, (acc, mk) => acc + mk.sks);

  void tambahMatkul(MataKuliah mk) {
    if (totalSks + mk.sks > 24) {
      throw SksMelebihiBatasException(
        'Gagal menambah "${mk.nama}" (${mk.sks} SKS). Total SKS akan menjadi ${totalSks + mk.sks} SKS, melebihi batas maksimal 24 SKS.',
      );
    }
    _krs.add(mk);
  }

  bool get isGanjil {
    int lastDigit = int.tryParse(_nim[_nim.length - 1]) ?? 0;
    return lastDigit % 2 != 0;
  }

  @override
  String toString() => '$nim - $nama ($totalSks SKS)';
}
