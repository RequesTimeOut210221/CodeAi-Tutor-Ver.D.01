import React from 'react';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  GitBranch,
  BookOpen,
  Boxes,
} from 'lucide-react';

interface ArchitectureViewProps {
  onOpenFile?: (path: string, line?: number) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onOpenFile }) => {
  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Dart OOP System Design
              </span>
              <span className="text-xs text-slate-400 font-mono">Clean Architecture Blueprint</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Sistem Nilai Akademik: Class Diagram & Domain Invariants
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl">
              Strict object-oriented model structure designed around polymorphic grading rules,
              encapsulated state mutations, defensive unmodifiable collections, and functional fold pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Main Architectural Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Polymorphic Course Hierarchy */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
            <Boxes className="w-4 h-4" />
            <span>Polymorphic Course Hierarchy</span>
          </div>

          {/* Abstract Base Class */}
          <div
            onClick={() => onOpenFile?.('lib/models/mata_kuliah.dart', 6)}
            className="cursor-pointer group p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 hover:border-indigo-400 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-300">
                abstract class MataKuliah
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                implements Konversi
              </span>
            </div>
            <div className="text-xs text-slate-400 space-y-0.5 font-mono">
              <p>+ String kode, nama; int sks;</p>
              <p className="text-amber-400/90">+ abstract double nilaiAkhir(komponen);</p>
              <p>+ void validasiKomponen(komponen);</p>
              <p>+ String keHuruf(angka);</p>
              <p>+ bool cekLulus(nilai); // &gt;= 55.0</p>
            </div>
          </div>

          <div className="flex justify-center text-slate-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
          </div>

          {/* Subclasses */}
          <div className="space-y-2.5">
            <div
              onClick={() => onOpenFile?.('lib/models/matkul_teori.dart', 4)}
              className="cursor-pointer p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-xs transition-colors"
            >
              <div className="font-mono font-semibold text-slate-200">MatkulTeori</div>
              <div className="text-slate-400 text-[11px] mt-1 font-mono">
                Formula: (0.30 * tugas) + (0.30 * uts) + (0.40 * uas)
              </div>
            </div>

            <div
              onClick={() => onOpenFile?.('lib/models/matkul_praktikum.dart', 5)}
              className="cursor-pointer p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-xs transition-colors"
            >
              <div className="font-mono font-semibold text-slate-200 flex items-center justify-between">
                <span>MatkulPraktikum</span>
                <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1 rounded">Kehadiran &ge; 75%</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-1 font-mono">
                Formula: (0.50 * praktikum) + (0.20 * laporan) + (0.30 * ujian)
              </div>
            </div>

            <div
              onClick={() => onOpenFile?.('lib/models/matkul_proyek.dart', 4)}
              className="cursor-pointer p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-xs transition-colors"
            >
              <div className="font-mono font-semibold text-slate-200">MatkulProyek</div>
              <div className="text-slate-400 text-[11px] mt-1 font-mono">
                Formula: (0.20 * proposal) + (0.30 * progres) + (0.50 * demo)
              </div>
            </div>

            <div
              onClick={() => onOpenFile?.('lib/models/matkul_seminar.dart', 6)}
              className="cursor-pointer p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-xs transition-colors"
            >
              <div className="font-mono font-semibold text-slate-200 flex items-center justify-between">
                <span>MatkulSeminar</span>
                <span className="text-[10px] text-violet-400 bg-violet-400/10 px-1 rounded">Excluded from IPS</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-1 font-mono">
                50% Presentasi + 50% Naskah • Output: 'L' or 'TL'
              </div>
            </div>

            <div
              onClick={() => onOpenFile?.('lib/models/matkul_magang.dart', 6)}
              className="cursor-pointer p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-xs transition-colors"
            >
              <div className="font-mono font-semibold text-slate-200 flex items-center justify-between">
                <span>MatkulMagang</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-1 rounded">Max 20 SKS</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-1 font-mono">
                Formula: (0.60 * mitra) + (0.40 * dosen)
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Domain Entity & State Invariants */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Domain Invariants & State Protection</span>
          </div>

          {/* Mahasiswa Card */}
          <div
            onClick={() => onOpenFile?.('lib/models/mahasiswa.dart', 5)}
            className="cursor-pointer p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 transition-all space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-cyan-300">class Mahasiswa</span>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Encapsulated</span>
            </div>
            <div className="text-slate-400 space-y-1 font-mono text-[11px]">
              <p className="text-emerald-400/90">• List&lt;MataKuliah&gt; _krs (private)</p>
              <p>• get krs =&gt; List.unmodifiable(_krs)</p>
              <p className="text-amber-400">• tambahMatkul(mk): totalSks + mk.sks &le; 24</p>
              <p>• nim setter: regex ^\d+$ & min length 3</p>
              <p>• isGanjil: lastDigit % 2 != 0</p>
            </div>
          </div>

          {/* Nilai Card */}
          <div
            onClick={() => onOpenFile?.('lib/models/nilai.dart', 5)}
            className="cursor-pointer p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-slate-200">class Nilai</span>
              <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Remedial Capped</span>
            </div>
            <div className="text-slate-400 space-y-1 font-mono text-[11px]">
              <p>• MataKuliah matkul; Map&lt;String, double&gt; komponen</p>
              <p>• int jumlahRemedial = 0; double? _nilaiSetelahRemedial</p>
              <p className="text-amber-400">
                • lakukanRemedial(nilaiBaru):
                <br />
                &nbsp;&nbsp;cap: nilaiBaru &gt; 60.0 ? 60.0 : nilaiBaru
              </p>
              <p>• Throws if nilaiAngkaAwal &ge; 55 or attempt &ge; 1</p>
            </div>
          </div>

          {/* KartuHasilStudi Card */}
          <div
            onClick={() => onOpenFile?.('lib/models/kartu_hasil_studi.dart', 10)}
            className="cursor-pointer p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-slate-200">class KartuHasilStudi</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                Functional Fold
              </span>
            </div>
            <div className="text-slate-400 space-y-1 font-mono text-[11px]">
              <p className="text-indigo-400">• hitungIPS(): fold() with where(!MatkulSeminar)</p>
              <p>• Set&lt;MataKuliah&gt; get matkulTidakLulus</p>
              <p className="text-rose-400">• prosesRemedial(): try-catch-rethrow-finally</p>
              <p>• List&lt;String&gt; logError = [] (audit trail)</p>
            </div>
          </div>
        </div>

        {/* Column 3: Services & Exception Model */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm">
            <GitBranch className="w-4 h-4" />
            <span>Service Layer & Exception Matrix</span>
          </div>

          {/* SistemAkademik Service */}
          <div
            onClick={() => onOpenFile?.('lib/services/sistem_akademik.dart', 19)}
            className="cursor-pointer p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 hover:border-amber-400 transition-all space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-amber-300">class SistemAkademik</span>
              <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Service</span>
            </div>
            <div className="text-slate-400 space-y-1 font-mono text-[11px]">
              <p className="text-cyan-300">• hitungPeringkatKelas(List&lt;DataMahasiswaIps&gt;)</p>
              <p className="text-slate-400 pl-2">
                1. Sort IPS descending (b.ips.compareTo(a.ips))
                <br />
                2. Tie-break: NIM ascending (a.nim.compareTo(b.nim))
              </p>
              <p className="text-emerald-400">• tentukanPredikat(ips): Cumlaude / Sangat Memuaskan / Memuaskan</p>
            </div>
          </div>

          {/* Custom Exceptions Catalog */}
          <div
            onClick={() => onOpenFile?.('lib/exceptions/custom_exceptions.dart', 5)}
            className="cursor-pointer p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 text-xs"
          >
            <div className="flex items-center space-x-1.5 text-rose-400 font-mono font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Custom Exception Matrix</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="p-1.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                NilaiDiLuarRentangException
                <span className="block text-[10px] text-rose-400/80">Value &lt; 0.0 or &gt; 100.0</span>
              </div>
              <div className="p-1.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                KehadiranKurangException
                <span className="block text-[10px] text-amber-400/80">Praktikum attendance &lt; 75.0%</span>
              </div>
              <div className="p-1.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                SksMelebihiBatasException
                <span className="block text-[10px] text-orange-400/80">KRS total &gt; 24 SKS</span>
              </div>
              <div className="p-1.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                KonversiSksException
                <span className="block text-[10px] text-purple-400/80">MatkulMagang SKS &gt; 20</span>
              </div>
              <div className="p-1.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                RemedialDitolakException
                <span className="block text-[10px] text-red-400/80">Already passed (&ge;55) or attempt &gt; 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
