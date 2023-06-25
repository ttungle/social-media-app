import { TimelinePostResultData } from '@/models';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

export function useInfinityScroll(params: any) {
  const observer = useRef<IntersectionObserver>();
  const { queryKey, queryFn } = params;

  const infiniteQuery = useInfiniteQuery({
    queryKey: [...queryKey],
    queryFn: queryFn,
    getNextPageParam: (lastPage: TimelinePostResultData, allPages: TimelinePostResultData[]) => {
      const nextPage = allPages.length + 1;
      return lastPage.data.posts.length !== 0 ? nextPage : undefined;
    },
  });

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;

      if (target.isIntersecting && infiniteQuery.hasNextPage) infiniteQuery.fetchNextPage();
    },
    [infiniteQuery.hasNextPage, observer]
  );

  const lastPost = useCallback(
    (node: any) => {
      if (!node) return;
      const option = { threshold: 0 };

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(handleObserver, option);
      observer.current.observe(node);
    },
    [infiniteQuery.hasNextPage]
  );

  return { lastPost, observer, infiniteQuery };
}
