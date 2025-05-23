import React, { Fragment, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { TITLE } from "../../../const";

import Loader from "../../loader";

import ShareIcon from "../../../assets/share.svg";
import CalendarIcon from "../../../assets/calendar.svg";

import "./activityPage.css";
import { useParams } from "react-router-dom";
function addSrc(src) {
  return function (img) {
    if (img) {
      img.src = src;
    }
  };
}
function ActivityPage(props) {
  const [activity, setActivity] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [couldShare, setCouldShare] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    if (navigator.share) {
      setCouldShare(true);
    }
    fetch(`https://csess.su.hkust.edu.hk/api/activity.php?id=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setNotFound(true);
        } else {
          setActivity(data);
          setNotFound(false);
        }
      });
    document.title = `${activity.event || "Activity"} | ${TITLE}`;
  }, [id, activity.event]);
  function onClickShare() {
    if (navigator.share) {
      let url = document.location.href;
      navigator.share({ title: activity.event, url: url });
    }
  }
  function renderData() {
    if (notFound) {
      return <Navigate to="/404/" />;
    }
    if (activity.aid) {
      return (
        <div>
          <meta
            name="Description"
            content={activity.description
              .replace(/<[^>]*>?/gm, "")
              .substring(0, 150)}
          />
          <meta
            property="og:title"
            content={`${activity.event || "Activity"} | ${TITLE}`}
          />
          <meta property="og:image" content={activity.thumb} />
          <meta
            property="og:description"
            content={activity.description
              .replace(/<[^>]*>?/gm, "")
              .substring(0, 150)}
          />

          <div className="act-page-grid">
            <div className="header-side">
              <h1 className="pageHeader">Activity</h1>
              <h2 className="activity-title">
                <span>{activity.event}</span>
              </h2>
              <div className="activity-details">
                <div className="activity-detail">
                  <div className="title">Start Time</div>
                  <div className="text">{activity.starttime}</div>
                </div>
                <div className="activity-detail">
                  <div className="title">End Time</div>
                  <div className="text">{activity.endtime}</div>
                </div>
                <div className="activity-detail">
                  <div className="detail title">Venue</div>
                  <div className="detail text">{activity.venue}</div>
                </div>
              </div>
            </div>
            <div className="control-side">
              {couldShare && (
                <div className="control-item" onClick={onClickShare}>
                  <img src={ShareIcon} alt="Share" />
                </div>
              )}
              <div className="control-item">
                <a
                  href={`https://csess.su.hkust.edu.hk/api/ical.php?id=${id}`}
                  download
                >
                  <img src={CalendarIcon} alt="Download iCal" />
                </a>
              </div>
            </div>
          </div>
          <div className="activity-desc">
            {activity.description !== "<p></p>" && (
              <Fragment>
                <h3>Description</h3>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: activity.description }}
                ></div>
              </Fragment>
            )}

            {activity.price !== "<p></p>" && (
              <Fragment>
                <h3>Price</h3>
                <div
                  className="price"
                  dangerouslySetInnerHTML={{ __html: activity.price }}
                ></div>
              </Fragment>
            )}
            {activity.hasThumb && (
              <picture>
                <source
                  srcSet={
                    "https://assets.csess.workers.dev/images/h_500,w_500,to_avif/" +
                    activity.thumb
                  }
                  type="image/avif"
                />
                <source
                  srcSet={
                    "https://assets.csess.workers.dev/images/h_500,w_500,to_webp/" +
                    activity.thumb
                  }
                  type="image/webp"
                />
                <img
                  ref={addSrc(activity.thumb)}
                  alt={activity.event}
                  className="thumb"
                  loading="lazy"
                />
              </picture>
            )}
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }

  return (
    <div className="activityPage">
      <div className="container">{renderData()}</div>
    </div>
  );
}

export default ActivityPage;
