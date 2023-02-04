import { useState } from 'react';

import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

import scss from 'feedback.module.scss';

const feedbackOptions = ['good', 'neutral', 'bad'];

const App = () => {
  const [feedbacks, setFeedabacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const leaveFeedback = propName => {
    setFeedabacks(prevState => {
      const value = prevState[propName];
      return {
        ...prevState,
        [propName]: value + 1,
      };
    });
  };

  const { good, neutral, bad } = feedbacks;
  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = propName => {
    if (!total) return 0;

    const value = feedbacks[propName];
    const result = ((value / total) * 100).toFixed(2);
    return Number(result);
  };

  const goodPercent = countPositiveFeedbackPercentage('good');

  return (
    <>
      <div className={scss.wrapper}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={feedbackOptions}
            leaveFeedback={leaveFeedback}
          ></FeedbackOptions>
        </Section>

        <Section title="Statistics">
          {!total ? (
            <Notification message={'There is no feedback'}></Notification>
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              goodPercent={goodPercent}
            ></Statistics>
          )}
        </Section>
      </div>
    </>
  );
};

export default App;
