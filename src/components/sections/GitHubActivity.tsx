import { Reveal } from '../Reveal';

export function GitHubActivity() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">GitHub Activity</h2>
        <a href="https://github.com/mirulhaziq" target="_blank" rel="noreferrer" className="block rounded-card border border-border bg-card p-6 hover:shadow-lg transition">
          <img
            src="https://ghchart.rshah.org/0071e3/mirulhaziq"
            alt="Amirul Haziq's GitHub contribution heatmap"
            className="w-full max-w-full"
            loading="lazy"
          />
          <p className="text-sm text-muted mt-4">github.com/mirulhaziq →</p>
        </a>
      </Reveal>
    </section>
  );
}
