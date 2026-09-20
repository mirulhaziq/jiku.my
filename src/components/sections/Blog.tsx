import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Section } from '../Section';
import { getAllPosts } from '@/lib/posts';

function formatDate(iso: string) {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function Blog() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Section
      id="blog"
      kicker="Blog"
      title="Notes from shipping"
      intro="Short write-ups from work I actually finished. Same portfolio, just the longer version of the story."
    >
      {posts.length === 0 ? (
        <div className="rounded-card border border-dashed border-border bg-card/50 p-8 text-center">
          <p className="text-muted text-sm">The first posts will land here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const excerpt = post.content.split(/\n\n+/)[0] ?? '';
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-card border border-border bg-card p-5 md:p-6 transition hover:border-blue-500/40 hover:shadow-sm"
              >
                <p className="text-sm text-muted mb-2">{formatDate(post.date)}</p>
                <h3 className="text-xl font-semibold tracking-tight mb-2 text-fg">
                  {post.title}
                </h3>
                <p className="text-muted leading-relaxed mb-4 line-clamp-2">{excerpt}</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-400 hover:underline"
            >
              View all posts <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
}
