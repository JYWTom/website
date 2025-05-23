import React, { Component } from "react";
import { TITLE } from "../../../const";
import { Link } from "react-router-dom";
import Loader from "../../loader";
import "../indexPage/indexPage.css";
import "./currentActivitiesPage.css";
function addSrc(src) {
  return function (img) {
    if (img) {
      img.src = src;
    }
  };
}
function timeAgo(timestamp, locale = "en") {
  let value;
  const diff = (new Date().getTime() - new Date(timestamp).getTime()) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (years > 0) {
    value = rtf.format(0 - years, "year");
  } else if (months > 0) {
    value = rtf.format(0 - months, "month");
  } else if (days > 0) {
    value = rtf.format(0 - days, "day");
  } else if (hours > 0) {
    value = rtf.format(0 - hours, "hour");
  } else if (minutes > 0) {
    value = rtf.format(0 - minutes, "minute");
  } else {
    value = rtf.format(0 - diff, "second");
  }
  return value;
}

function shortenString(str, length) {
  if (str.length > length) {
    return str.substring(0, length - 3) + "...";
  } else {
    return str;
  }
}

class currentActivitiesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
    };
  }

  componentDidMount() {
    fetch("https://csess.su.hkust.edu.hk/api/activities.php?type=current")
      .then((response) => {
        return response.json();
      })
      .then((data) => this.setState({ activities: data }));
  }

  renderActivites() {
    const activities = this.state.activities;
    if (activities && activities.length > 0) {
      return (
        <div className="activities">
          {activities.map((act, index) => {
            return (
              <Link
                to={`/activity/${act.aid}`}
                className="activity"
                key={index}
              >
                <div className="activityDetails">
                  <div className="title">
                    <span>{shortenString(act.event, 60)}</span>
                  </div>
                  <div className="date">{timeAgo(act.starttime)}</div>
                </div>
                <div className="thumb">
                  <picture>
                    <source
                      srcSet={
                        "https://assets.csess.workers.dev/images/h_500,w_500,to_avif/" +
                        act.thumb
                      }
                      type="image/avif"
                    />
                    <source
                      srcSet={
                        "https://assets.csess.workers.dev/images/h_500,w_500,to_webp/" +
                        act.thumb
                      }
                      type="image/webp"
                    />
                    <img
                      alt={act.event}
                      ref={addSrc(act.thumb)}
                      loading="lazy"
                    />
                  </picture>
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else {
      return <Loader />;
    }
  }

  render() {
    return (
      <div>
        <title>{`Activities | ${TITLE}`}</title>
        <div className="currentActivitiesPage">
          <div className="container">
            <h1 className="pageHeader">Activities</h1>
            {this.renderActivites()}
          </div>
        </div>
      </div>
    );
  }
}

export default currentActivitiesPage;
