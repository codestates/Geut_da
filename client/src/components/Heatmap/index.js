import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

import styled from "styled-components/macro";
import "./react-calendar-heatmap.css";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();

const HeatmapSize = styled.div`
  width: 600px;
`;

// 데이터에 해당일자 정보가 없으면
const Heatmap = ({
  counts: { total, totalByMonth, totalByDay },
  searchDayHandler,
}) => {
  return (
    <div>
      <h3>긋다를 통해 추억을 새겨보세요!</h3>
      <p>
        {`이번 달 ${totalByMonth || 0}개의
        기억을 담았다. 나의 그림일기 총 ${total || 0}개`}
        .
      </p>
      <HeatmapSize>
        <CalendarHeatmap
          startDate={new Date(`${year - 1}-${month}-${date}`)}
          endDate={now}
          values={totalByDay || []}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return value.count < 5
              ? `color-github-${value.count}`
              : `color-github-4`;
          }}
          tooltipDataAttrs={(value) => {
            if (value.date && value.count) {
              return {
                "data-tip": `${value.date}일 ${value.count}장`,
              };
            }
            return {
              "data-tip": `일기가 없네요`,
            };
          }}
          showWeekdayLabels={true}
          onClick={(value) => {
            // if (!value) return;
            searchDayHandler(value);
          }}
        />
        <ReactTooltip />
      </HeatmapSize>
    </div>
  );
};

export default Heatmap;
