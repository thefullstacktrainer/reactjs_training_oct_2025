import { useRef, useState } from "react";
import "./Feedback.css";

export default function FeedbackFormUncontrolled() {
  const nameRef = useRef();
  const emailRef = useRef();
  const ratingRef = useRef();
  const commentsRef = useRef();

  const [feedbackList, setFeedbackList] = useState([]);
  const [errors, setErrors] = useState({});

  const validate = (feedback) => {
    const newErrors = {};
    if (!feedback.name) newErrors.name = "Name is required";
    if (!feedback.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(feedback.email)) newErrors.email = "Email format is invalid";
    if (!feedback.comments) newErrors.comments = "Comments are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedback = {
      name: nameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      rating: ratingRef.current.value,
      comments: commentsRef.current.value.trim(),
    };

    const validationErrors = validate(feedback);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFeedbackList((prev) => [feedback, ...prev]);
    setErrors({});

    // Reset form
    nameRef.current.value = "";
    emailRef.current.value = "";
    ratingRef.current.value = "5";
    commentsRef.current.value = "";
  };

  return (
    <div className="feedback-section">
      <h3>Customer Feedback (Uncontrolled)</h3>

      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          Name:
          <input type="text" ref={nameRef} placeholder="Enter your name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Email:
          <input type="email" ref={emailRef} placeholder="Enter your email" />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>
          Rating:
          <select ref={ratingRef} defaultValue="5">
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Poor</option>
          </select>
        </label>

        <label>
          Comments:
          <textarea ref={commentsRef} rows={4} placeholder="Write your feedback..." />
          {errors.comments && <span className="error">{errors.comments}</span>}
        </label>

        <div className="form-actions">
          <button type="submit">Submit</button>
          <button
            type="reset"
            onClick={() => {
              nameRef.current.value = "";
              emailRef.current.value = "";
              ratingRef.current.value = "5";
              commentsRef.current.value = "";
              setErrors({});
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {feedbackList.length > 0 && (
        <div className="feedback-list">
          <h3>Submitted Feedback</h3>
          <ul>
            {feedbackList.map((feedback, idx) => (
              <li key={idx}>
                <strong>{feedback.name}</strong> ({feedback.email}) - Rating: {feedback.rating}
                <p>{feedback.comments}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
