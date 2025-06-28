import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './emotion-heatmap.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const EmotionHeatmap = ({ emotion, data }) => {
  const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const endDate = new Date();

  const values = data.map((entry) => ({
    date: entry.date,
    count: entry.value,
  }));

  return (
    <div className="mb-10 flex justify-center">
      <div>
        <div style={{ width: '900px', height: '140px' }}>
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
           classForValue={(value) => {
  if (!value ) return 'color-empty';

  const level =
    value.count >= 8 ? 4 :
    value.count >= 6 ? 3 :
    value.count >= 4 ? 2 :
    value.count >= 2 ? 1 : 0;

  return `${emotion}-color-scale-${level}`;
}}

            tooltipDataAttrs={(value) =>
              value.date
                ? {
                    'data-tooltip-id': 'emotion-tooltip',
                    'data-tooltip-content': `${new Date(value.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })}: ${value.count}`,
                  }
                : {}
            }
            showWeekdayLabels={true}
          />
          <ReactTooltip id="emotion-tooltip" />
        </div>
      </div>
    </div>
  );
};

export default EmotionHeatmap;
