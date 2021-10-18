import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Button, Modal, Input, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../actions";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const MovieItem = ({ movie }) => {
  const [movieComments, setMovieComments] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const allComments = useSelector((state) => state.allComments);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    dispatch(addComment(newComment));
    setNewComment({});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setMovieComments(allComments.find((el) => movie.id === el.id));
  }, [allComments]);

  return (
    <>
      <Row gutter={[16, 16]} className="movie_item">
        <Col span={6}>
          <img src={movie.medium_cover_image} alt="alt" />
        </Col>
        <Col span={12}>
          <Typography>
            {movie.genres.map((el) => (
              <>
                <span style={{ color: "red", fontSize: "0.7rem" }}>{el} </span>
              </>
            ))}
          </Typography>
          <Typography style={{ color: "white", fontSize: "0.9rem" }}>
            {movie.description_full}
          </Typography>
          <Typography>
            <Typography.Title
              level={4}
              style={{ color: "white", margin: "0.5rem 0 0.5rem" }}
            >
              Comments
            </Typography.Title>
            <Row gutter={[32, 16]}>
              {movieComments?.comments?.map((com) => {
                const idx = movieComments.comments.indexOf(com);
                return (
                  <>
                    <Col span={8}>
                      <Card
                        headStyle={{
                          backgroundColor: "#434343",
                          color: "white",
                          border: "#262626",
                          fontSize: "0.7rem",
                        }}
                        style={{
                          width: "12rem",
                          height: "8rem",
                          backgroundColor: "#434343",
                          color: "white",
                          border: "#262626",
                          fontSize: "0.8rem",
                        }}
                        key={idx}
                        title={com.name}
                        extra={
                          <DeleteOutlined
                            onClick={() => {
                              dispatch(
                                deleteComment({ id: movie.id, idx: idx })
                              );
                            }}
                          />
                        }
                      >
                        {com.text}
                      </Card>
                    </Col>
                    <br />
                  </>
                );
              })}
              <Col span={8}>
                <Card style={{ width: "12rem", height: "8rem" }}>
                  <Button
                    type="dashed"
                    onClick={showModal}
                    style={{
                      width: "12rem",
                      height: "8rem",
                      margin: "-1.55rem",
                      color: "#f5222d",
                      borderColor: "white",
                      backgroundColor: "#262626",
                    }}
                    icon={<PlusOutlined />}
                  ></Button>
                </Card>
              </Col>
            </Row>
          </Typography>
        </Col>
        <Modal
          title="Leave a comment"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ type: "danger" }}
        >
          <Input
            value={newComment.name}
            placeholder="Write your name"
            onChange={(e) =>
              setNewComment({
                ...newComment,
                id: movie.id,
                name: e.target.value,
              })
            }
          />
          <br />
          <Input.TextArea
            placeholder="Leave your comment here...."
            value={newComment.text}
            onChange={(e) =>
              setNewComment({
                ...newComment,
                id: movie.id,
                text: e.target.value,
              })
            }
          />
        </Modal>
      </Row>
    </>
  );
};

export default MovieItem;
