'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { WidgetChartCreate } from '@/components/widgets/chart/create';
import {
  EChartType,
  MOCK_CHART_DATA,
  MOCK_CHART_LEGEND,
  DEFAULT_CHART_TYPE,
} from '@/components/widgets/chart/mock';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
  WidgetButtons,
  WidgetIcon,
  WidgetProps,
} from '@/components/layout/widget';
import { Button } from '@/components/ui/button';
import {
  ChartArea,
  ChartColumn,
  ChartColumnStacked,
  ChartSpline,
  LayoutDashboard,
  RefreshCw,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { useResizeObserver } from '@/core/hooks/use-resize-observer';
import { v4 } from 'uuid';
import { TooltipText } from '@/components/ui/tooltip';
import { ROUTES } from '@/core/settings/routes';
import { h } from 'preact';

export const WidgetChart = (props: WidgetProps) => {
  const ref = useRef<any>(null);
  const [chart, setChart] = useState<any>();
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get('type') ?? DEFAULT_CHART_TYPE;
  const loading = false;
  const id = `widget-chart-${v4()}`;

  // create chart
  const formatValue = (value: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
    }).format(value);
  };
  const create = useCallback(() => {
    if (ref.current) {
      const obj = WidgetChartCreate(ref, id, MOCK_CHART_DATA, MOCK_CHART_LEGEND, type, formatValue);
      setChart(obj);
    }
  }, [ref, type]);

  // update
  const handleChange = (type: EChartType) => {
    const path = ROUTES.DASHBOARD.path;
    router.push(`${path}?type=${type}`);
  };
  useEffect(() => {
    if (chart) chart.update(MOCK_CHART_DATA, type);
  }, [type]);

  // create, resize
  const { width, height, start } = useResizeObserver(ref, 100);
  useEffect(() => {
    if (width > 0 && height > 0 && start) chart?.remove();
    if (width > 0 && height > 0 && !start) create();
  }, [start, width, height]);

  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <LayoutDashboard />
        </WidgetIcon>
        <WidgetTitle>dashboard</WidgetTitle>
        <WidgetButtons>
          <TooltipText title="stacked bar chart" side="top">
            <Button
              variant={!type || type === EChartType.stackedBarChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(EChartType.stackedBarChart)}
            >
              <ChartColumnStacked />
            </Button>
          </TooltipText>
          <TooltipText title="grouped bar chart" side="top">
            <Button
              variant={type === EChartType.groupedBarChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(EChartType.groupedBarChart)}
            >
              <ChartColumn />
            </Button>
          </TooltipText>
          <TooltipText title="area bar chart" side="top">
            <Button
              variant={type === EChartType.areaChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(EChartType.areaChart)}
            >
              <ChartSpline />
            </Button>
          </TooltipText>
          <TooltipText title="stacked area chart" side="top">
            <Button
              variant={type === EChartType.stackedAreaChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(EChartType.stackedAreaChart)}
            >
              <ChartArea />
            </Button>
          </TooltipText>
          <Button variant="ghost" size="icon" asChild>
            <Link href={ROUTES.DASHBOARD.path}>
              <RefreshCw />
            </Link>
          </Button>
        </WidgetButtons>
      </WidgetHeader>
      <WidgetContent variant="padding">
        <div ref={ref} className="w-full h-full relative">
          {loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </div>
          )}
        </div>
      </WidgetContent>
    </Widget>
  );
};
