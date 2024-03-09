import BasicComponent from "../basic/BasicComponent.js";
import inputTemplate from "./inputTemplate.js";

class Input extends BasicComponent {
  constructor() {
    super(inputTemplate);
    this.inputValue = "";

    this.addEventListenerToElement("input", "input", this.inputHandler);
    this.addEventListenerToElement("button", "click", this.clickHandler);
  }

  clickHandler = () => {
    performance.mark("buttonClickStart");

    this.dispatchCustomEvent(
      "inputSubmit",
      { value: this.inputValue },
      { bubbles: true, composed: true }
    );

    this.inputValue = ""; // 입력값 초기화

    // 성능 측정 종료
    performance.mark("buttonClickEnd");

    // 시작과 종료 마크 사이의 성능 측정
    performance.measure("ButtonClick", "buttonClickStart", "buttonClickEnd");

    // 측정 결과 로깅
    const measure = performance.getEntriesByName("ButtonClick")[0];
    console.log(`버튼 클릭 처리 시간: ${measure.duration}ms`);
  };

  inputHandler(event) {
    this.inputValue = event.target.value;
  }
}

customElements.define("input-component", Input);
