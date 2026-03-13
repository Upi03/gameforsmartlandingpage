import { Metadata } from 'next';
import { allItemsData } from '@/data/allItemsData';
import GameDetailView from '@/components/GameDetailView';
import { notFound } from 'next/navigation';

interface Props {
    params: { slug: string };
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item || item.type !== 'game') {
        return {
            title: 'Game Not Found | GameForSmart 2026',
        };
    }

    const title = `${item.title} | GameForSmart 2026`;

    return {
        title: title,
        description: item.description.substring(0, 160),
        openGraph: {
            title: title,
            description: item.description.substring(0, 160),
            images: [item.image],
        },
    };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item || item.type !== 'game') {
        notFound();
    }

    return <GameDetailView game={item} />;
}
