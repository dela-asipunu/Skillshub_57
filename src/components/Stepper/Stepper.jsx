import { useState } from "react";
import "./Stepper.css";

const Stepper = ({ steps, submit }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="stepper-container">
      <div className="stepper">
        {/* ✅ Show only the current step */}
        <div className="step active">{steps[currentStep]}</div>
      </div>

      {currentStep < steps.length - 1 && (
        <button className="next-btn" onClick={nextStep}>
        next
      </button>
      )}

      {currentStep === steps.length - 1 &&(
        <button className="next-btn" onClick={submit}>
          Sign up
      </button>
      )}
      
    </div>
  );
};

export default Stepper;
