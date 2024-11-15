import React, { useState } from "react";

const Form = () => {
  // State to handle form inputs and API results
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    interests: "",
    budget: "",
    occasion: "",
  });

  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Show loading state
    setError(""); // Reset error state
    setRecommendations(""); // Reset previous recommendations

    try {
      // Send form data to the backend API
      const response = await fetch("/api/generate-gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check if the API response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      // Parse and set the recommendations
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      console.error("Error:", err.message);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Gift Recommendation Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter recipient's name"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="Enter recipient's age"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="interests">Interests:</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            required
            placeholder="e.g., sports, gaming, reading"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="budget">Budget:</label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            placeholder="e.g., 50-100 USD"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="occasion">Occasion:</label>
          <input
            type="text"
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            required
            placeholder="e.g., birthday, Christmas"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Get Recommendations"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {/* Recommendations */}
      {recommendations && (
        <div style={{ marginTop: "20px" }}>
          <h2>Gift Recommendations:</h2>
          <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
            {recommendations}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Form;


// import React, { useState } from "react";
// import { getGiftRecommendations } from "../../api/generate-gift"; // Import the function

// const Form = () => {
//   // State to handle form inputs and API results
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     interests: "",
//     budget: "",
//     occasion: "",
//   });

//   const [recommendations, setRecommendations] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch("/api/generate-gift", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch recommendations");
//       }
  
//       const data = await response.json();
//       setRecommendations(data.recommendations);
//     } catch (error) {
//       console.error(error);
//       setError("Something went wrong. Please try again.");
//     }
//   };
  

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");
  //   setRecommendations("");

  //   try {
  //     // Call the API handler with the form data
  //     const result = await getGiftRecommendations(formData);
  //     setRecommendations(result);
  //   } catch (err) {
  //     setError("Failed to fetch recommendations. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   return (
//     <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
//       <h1>Gift Recommendation Form</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="age">Age:</label>
//           <input
//             type="number"
//             id="age"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="interests">Interests:</label>
//           <input
//             type="text"
//             id="interests"
//             name="interests"
//             value={formData.interests}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="budget">Budget:</label>
//           <input
//             type="text"
//             id="budget"
//             name="budget"
//             value={formData.budget}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="occasion">Occasion:</label>
//           <input
//             type="text"
//             id="occasion"
//             name="occasion"
//             value={formData.occasion}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {recommendations && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Gift Recommendations:</h2>
//           <pre>{recommendations}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Form;
