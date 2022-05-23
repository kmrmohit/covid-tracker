import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchCovidData } from "./api";
import "./App.css";
import { debounce } from "./common-utils";
import Insight from "./components/insights";
import { Overlay } from "./components/overlay";
import RefreshButton from "./components/refresh-button";
import Table from "./components/table";
import ViewportContainer from "./components/viewport-container";
import { InsightConfig, LabelConfig, TableConfig } from "./config";
import { CovidData } from "./global";

function App() {
  const [data, setData] = useState<CovidData>();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const getData = useCallback(
    debounce(() => {
      setLoading(true);
      return fetchCovidData()
        .then((data) => setData(data))
        .catch((err) => setErr(err))
        .finally(() => setLoading(false));
    }, 0),
    []
  );

  const insightWithLabels = useMemo(
    () => InsightConfig.map((obj) => ({ label: LabelConfig[obj.key], ...obj })),
    []
  );

  const columns = useMemo(() => TableConfig, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Covid Tracker</header>
      <div className="app-content">
        <section className="insights">
          <h2 className="title">Global Data</h2>
          <div className="list">
            {insightWithLabels.map(({ key, label }) => (
              <Insight key={key} label={label} value={data?.Global?.[key]} />
            ))}
          </div>
        </section>
        <RefreshButton
          label="Refresh Data"
          onClick={getData}
          loading={loading}
        />
        <section className="country-data">
          <ViewportContainer buffer="40px" minHeight="300px">
            <Table
              title="Country Data"
              dataSource={data?.Countries || []}
              columns={columns}
              defaultSortColumnKey="Country"
              defaultSortDirection="asc"
            />
            {data?.Countries.length ? null : (
              <div className="no-data">Data not available</div>
            )}
          </ViewportContainer>
        </section>
      </div>
      {(data == null || !data?.Countries?.length) && loading ? (
        <Overlay opacity="0.5" />
      ) : null}
    </div>
  );
}

export default App;
