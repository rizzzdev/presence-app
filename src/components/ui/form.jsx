import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export const Input = (props) => {
  const { htmlFor, label, value, setValue, type = "text", placeholder } = props;
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-start text-xs text-white/60 ">
      <label htmlFor={htmlFor}>{label}</label>
      <div
        className={`w-full flex gap-2 justify-between items-center border ${isFocused ? "border-accent/80" : "border-white/10"} rounded-lg p-2`}
      >
        <input
          type={
            type === "text"
              ? "text"
              : type === "password" && isRevealed
                ? "text"
                : "password"
          }
          autoComplete="off"
          id={htmlFor}
          className="w-full outline-none"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === "password" && isRevealed && (
          <LuEyeClosed
            className="text-xl"
            onClick={() => {
              setIsRevealed(!isRevealed);
            }}
          />
        )}
        {type === "password" && !isRevealed && (
          <LuEye
            className="text-xl"
            onClick={() => {
              setIsRevealed(!isRevealed);
            }}
          />
        )}
      </div>
    </div>
  );
};

export const Button = (props) => {
  const {
    children,
    onClick,
    disabled = false,
    useMarginTop = true,
    marginTop,
  } = props;

  return (
    <button
      className={`w-full p-2 rounded-lg flex gap-2 justify-center items-center text-sm ${disabled ? "bg-accent/60 text-white/60 cursor-not-allowed" : "bg-accent/70 text-white/70 hover:bg-accent/80 hover:text-white/80 cursor-pointer"} font-semibold`}
      onClick={onClick}
      disabled={disabled}
      style={{ marginTop: useMarginTop ? marginTop || "4px" : "0px" }}
    >
      {children}
    </button>
  );
};

const Form = (props) => {
  const { children, onSubmit } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit();
  };

  return (
    <form
      className="w-full flex flex-col justify-start items-center gap-2"
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
