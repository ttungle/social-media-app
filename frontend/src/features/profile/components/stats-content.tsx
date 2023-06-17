import { postApi } from '@/api/post';
import { convertMonth } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface StatsContentProps {}

export function StatsContent(props: StatsContentProps) {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [yearValue, setYearValue] = useState(() => new Date().getFullYear());
  const timerRef = useRef<any>(null);
  const { i18n, t } = useTranslation('profile');

  const { data: postStatsData, isLoading } = useQuery({
    queryKey: ['getPostStats', year, i18n.language],
    queryFn: async () => postApi.postStats(year),
  });

  const handleInputChange = useCallback((event: any) => {
    setYearValue(event.target.value);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setYear(event.target.value);
    }, 600);
  }, []);

  const data = useMemo(
    () =>
      Array.isArray(postStatsData?.data?.stats)
        ? postStatsData?.data?.stats.map((item: any) => ({ ...item, month: convertMonth(item.month, i18n.language) }))
        : [],
    [postStatsData]
  );

  return (
    <div className="bg-white rounded-lg p-4 mt-4 shadow">
      <p className="m-0 text-xl font-semibold">{t('stats.title')}</p>
      <p className="text-slate-400 text-sm mt-2">{t('stats.description')}</p>

      <div className="flex items-center justify-start mt-4">
        <p className="text-sm font-medium ">{t('stats.overview')}</p>
        <input
          type="text"
          value={yearValue}
          onChange={handleInputChange}
          className={`px-2 h-9 w-24 ml-4 border rounded-lg outline-none text-sm text-gray-500`}
        />
      </div>

      <div className="w-full h-96 mt-9">
        {!isLoading && data && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="postCount" name={t('stats.postCount')!} fill="#8884d8" />
              <Bar dataKey="totalLikes" name={t('stats.totalLikes')!} fill="#4dd4c2" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
