import '../models/mahasiswa.dart';
import '../models/kartu_hasil_studi.dart';

/// Struktur data untuk menyimpan Mahasiswa beserta KHS dan IPS
class DataMahasiswaIps {
  Mahasiswa mahasiswa;
  KartuHasilStudi khs;
  double ips;

  DataMahasiswaIps({
    required this.mahasiswa,
    required this.khs,
  }) : ips = khs.hitungIPS();
}

/// Service Sistem Akademik
/// Mengelola pengolahan data mahasiswa, perankingan kelas,
/// dan pengelompokan predikat (Ketentuan Khusus NIM Genap).
class SistemAkademik {
  static String tentukanPredikat(double ips) {
    if (ips >= 3.50) {
      return 'Cumlaude';
    } else if (ips >= 3.00) {
      return 'Sangat Memuaskan';
    } else {
      return 'Memuaskan';
    }
  }

  static Map<String, List<Mahasiswa>> hitungPeringkatKelas(
      List<DataMahasiswaIps> listData) {
    if (listData.length < 5) {
      print('Perhatian: Data mahasiswa kurang dari minimal 5 mahasiswa.');
    }

    var sortedList = List<DataMahasiswaIps>.from(listData);

    sortedList.sort((a, b) {
      int compIps = b.ips.compareTo(a.ips); // Descending berdasarkan IPS
      if (compIps != 0) return compIps;
      return a.mahasiswa.nim.compareTo(b.mahasiswa.nim); // Ascending berdasarkan NIM
    });

    Map<String, List<Mahasiswa>> hasilKelompok = {
      'Cumlaude': [],
      'Sangat Memuaskan': [],
      'Memuaskan': [],
    };

    print('=' * 80);
    print('                      DAFTAR PERINGKAT KELAS                       ');
    print('=' * 80);
    print(
      '${"Rank".padRight(6)}| '
      '${"NIM".padRight(12)}| '
      '${"Nama Mahasiswa".padRight(25)}| '
      '${"IPS".padRight(8)}| '
      '${"Predikat"}',
    );
    print('-' * 80);

    int rank = 1;
    for (var item in sortedList) {
      String predikat = tentukanPredikat(item.ips);

      hasilKelompok.putIfAbsent(predikat, () => []).add(item.mahasiswa);

      print(
        '${"$rank.".padRight(6)}| '
        '${item.mahasiswa.nim.padRight(12)}| '
        '${item.mahasiswa.nama.padRight(25)}| '
        '${item.ips.toStringAsFixed(2).padRight(8)}| '
        '$predikat',
      );
      rank++;
    }
    print('=' * 80);

    return hasilKelompok;
  }

  static void cetakKelompokPredikat(Map<String, List<Mahasiswa>> mapPredikat) {
    print('\n[PENGELOMPOKAN PREDIKAT (Map<String, List<Mahasiswa>>)]:');
    mapPredikat.forEach((predikat, listMhs) {
      print('\n🏷️  Predikat: $predikat (${listMhs.length} Mahasiswa)');
      if (listMhs.isEmpty) {
        print('   (Tidak ada mahasiswa)');
      } else {
        for (var m in listMhs) {
          print('   - [${m.nim}] ${m.nama}');
        }
      }
    });
  }
}
