import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import { Card, List, Typography } from "antd";
import { Pagination } from "antd";
import { fetchMovies } from "../actions";
import MovieItem from "./movie-item";
import "antd/dist/antd.css";
import { Footer } from "antd/lib/layout/layout";

const { Header, Content } = Layout;

function App() {
  const [limit, setLimit] = useState(5);

  const [page, setPage] = useState(1);
  const movies = useSelector((state) => state.movies);
  const movieCount = useSelector((state) => state.movieCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies(limit, page));
  }, [page]);

  return (
    <>
      <Layout className="layout" style={{ backgroundColor: "#434343" }}>
        <Header style={{ color: "white", backgroundColor: "#434343" }}>
          Movies APP
        </Header>
        <Content style={{ padding: "0.5rem 3rem" }}>
          <List
            grid={{ gutter: 32, column: 1 }}
            dataSource={movies}
            renderItem={(movie) => (
              <List.Item>
                <Card
                  headStyle={{
                    backgroundColor: "#262626",
                    color: "white",
                    border: "#262626",
                  }}
                  style={{
                    backgroundColor: "#262626",
                    color: "white",
                    border: "#262626",
                  }}
                  title={movie.title_long}
                  extra={
                    <Typography style={{ color: "white" }}>
                      {movie.rating}
                    </Typography>
                  }
                >
                  <MovieItem key={movie.id} movie={movie} />
                </Card>
              </List.Item>
            )}
          ></List>
        </Content>
        <Footer>
          <Pagination
            onChange={(page) => setPage(page)}
            defaultCurrent={1}
            total={movieCount / limit}
          />
        </Footer>
      </Layout>
    </>
  );
}


export default App;
