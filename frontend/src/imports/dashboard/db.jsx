import { Link } from 'react-router';
import svgPaths from './svg-iwdn88v58f.js';
import imgAb6AXuB2JWoa5YJeRf1N8NBsgNsxfuxw57HWkCvGjxDoKDspCvMgqFp9QiNsFWaMzqGpLMtPUrmBAaVhoczO79IFxfY5UOimk9M2PYxpijh2H9QHa7Meijak2BAYu4AkE8UsNlBkZbtf8Oo4EC5PKllc2LhieHzAhukovLPn9NwO1NafTdtKl6DLge6EulQbmyrGlDCmCz7Cp5QTYhlqnIvbaZj06Kg0FwYt0H3ZPAle2U49RG from './45c531f080826cf2db6388b67a8a06aabf0f247c.png';

function Heading() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Heading 1"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[32px] tracking-[-0.64px] whitespace-nowrap">
        <p className="leading-[40px]">Good Morning, Dr. Richards</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">
          Here is your analysis summary for today, October 24th.
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <Heading />
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        width="20"
      >
        <g id="Container">
          <path d={svgPaths.p2d8e4cc0} fill="white" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div
      className="bg-[#004ac6] content-stretch flex gap-[8px] items-center px-[24px] py-[16px] relative rounded-[12px] shrink-0"
      data-name="Button"
    >
      <div
        className="absolute bg-[rgba(255,255,255,0)] inset-[0_-0.01px_0_0] rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
        data-name="Button:shadow"
      />
      <Container2 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">New Analysis</p>
      </div>
    </div>
  );
}

function WelcomeHeader() {
  return (
    <div
      className="content-stretch flex items-end justify-between relative shrink-0 w-full"
      data-name="Welcome Header"
    >
      <Container />
      <Button />
    </div>
  );
}

function Overlay() {
  return (
    <div className="h-[41px] relative shrink-0 w-[30px]" data-name="Overlay">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="41"
        preserveAspectRatio="none"
        viewBox="0 0 30 41"
        width="30"
      >
        <g id="Overlay">
          <rect fill="#004AC6" fillOpacity="0.1" height="41" rx="8" width="30" />
          <path d={svgPaths.p313b7000} fill="#004AC6" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Overlay />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[12px] tracking-[0.6px] whitespace-nowrap">
          <p className="leading-[16px]">+12% vs last week</p>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">TESTS COMPLETED</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[32px] tracking-[-0.64px] w-full">
        <p className="leading-[40px]">1,284</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div
      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] flex-[1_0_0] min-w-px relative rounded-[12px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(226,232,240,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <div
          className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
          data-name="Overlay+Shadow"
        />
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="h-[42px] relative shrink-0 w-[34px]" data-name="Overlay">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="42"
        preserveAspectRatio="none"
        viewBox="0 0 34 42"
        width="34"
      >
        <g id="Overlay">
          <rect fill="#006B5F" fillOpacity="0.1" height="42" rx="8" width="34" />
          <path d={svgPaths.p332e5680} fill="#006B5F" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Overlay1 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">LAST TEST DATE</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[32px] tracking-[-0.64px] w-full">
        <p className="leading-[40px]">Oct 23, 2024</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur1() {
  return (
    <div
      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] flex-[1_0_0] min-w-px relative rounded-[12px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(226,232,240,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <div
          className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
          data-name="Overlay+Shadow"
        />
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="h-[42px] relative shrink-0 w-[36px]" data-name="Background">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="42"
        preserveAspectRatio="none"
        viewBox="0 0 36 42"
        width="36"
      >
        <g id="Background">
          <rect fill="#FFDBCD" height="42" rx="8" width="36" />
          <path d={svgPaths.p272c7480} fill="#943700" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div
      className="bg-[#14b8a6] content-stretch flex flex-col items-start relative rounded-[4px] shrink-0 size-[8px]"
      data-name="Background"
    >
      <div
        className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shadow-[0px_0px_0px_3px_rgba(20,184,166,0.2)] shrink-0 size-[8px]"
        data-name="Overlay+Shadow"
      />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Background />
        <Background1 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">HEALTH STATUS</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[32px] tracking-[-0.64px] w-full">
        <p className="leading-[40px]">Optimal</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur2() {
  return (
    <div
      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] flex-[1_0_0] min-w-px relative rounded-[12px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(226,232,240,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <div
          className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
          data-name="Overlay+Shadow"
        />
        <Container11 />
        <Container12 />
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="h-[41px] relative shrink-0 w-[38px]" data-name="Overlay">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="41"
        preserveAspectRatio="none"
        viewBox="0 0 38 41"
        width="38"
      >
        <g id="Overlay">
          <rect fill="#BA1A1A" fillOpacity="0.1" height="41" rx="8" width="38" />
          <path d={svgPaths.p20833b00} fill="#BA1A1A" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div
      className="bg-[#ba1a1a] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[9999px] shrink-0"
      data-name="Background"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
        <p className="leading-[15px]">CRITICAL</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Overlay2 />
        <Background2 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">ACTIVE ALERTS</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[32px] tracking-[-0.64px] w-full">
        <p className="leading-[40px]">02</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur3() {
  return (
    <div
      className="backdrop-blur-[6px] bg-[rgba(255,218,214,0.2)] flex-[1_0_0] min-w-px relative rounded-[12px]"
      data-name="Overlay+Border+OverlayBlur"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(186,26,26,0.2)] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <div
          className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
          data-name="Overlay+Shadow"
        />
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function SectionSummaryCardsGrid() {
  return (
    <div
      className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full"
      data-name="Section - Summary Cards Grid"
    >
      <OverlayBorderOverlayBlur />
      <OverlayBorderOverlayBlur1 />
      <OverlayBorderOverlayBlur2 />
      <OverlayBorderOverlayBlur3 />
    </div>
  );
}

function Heading1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Heading 2"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Health Trend Analysis</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Aggregate results over the last 30 days</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <Heading1 />
      <Container21 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="bg-[#faf8ff] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0"
      data-name="Button"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#004ac6] text-[12px] text-center tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">30 Days</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative shrink-0"
      data-name="Button"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] text-center tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">90 Days</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative shrink-0"
      data-name="Button"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] text-center tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">1 Year</p>
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div
      className="bg-[rgba(225,226,237,0.5)] content-stretch flex items-start p-[4px] relative rounded-[8px] shrink-0"
      data-name="Overlay"
    >
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container20 />
          <Overlay3 />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[25px] pb-[32px] right-[25px] top-[25px]"
      data-name="Margin"
    >
      <Container19 />
    </div>
  );
}

function Container23() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Oct 01</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Oct 08</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Oct 15</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Oct 22</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Today</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div
      className="absolute content-stretch flex items-start justify-between left-[25px] pt-[16px] right-[25px] top-[383px]"
      data-name="Container"
    >
      <Container23 />
      <Container24 />
      <Container25 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function SvgSimulatedDataSeries() {
  return (
    <div
      className="flex-[1_0_0] h-full min-w-px relative"
      data-name="SVG - Simulated Data Series"
    >
      <div className="absolute inset-[0_-0.12%_0_0]">
        <svg
          className="block size-full"
          fill="none"
          height="228.69"
          preserveAspectRatio="none"
          viewBox="0 0 763.473 228.69"
          width="763.473"
        >
          <g id="SVG - Simulated Data Series">
            <path
              d={svgPaths.p3da85600}
              id="Vector"
              stroke="#004AC6"
              strokeWidth="2.85862"
            />
            <path
              d={svgPaths.pc82aa0}
              id="Vector_2"
              stroke="#14B8A6"
              strokeDasharray="3.81 1.91"
              strokeWidth="2.85862"
            />
            <path
              d={svgPaths.pf3ef200}
              id="Vector_3"
              opacity="0.6"
              stroke="#BC4800"
              strokeWidth="2.85862"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function GridLines() {
  return (
    <div className="absolute inset-[0_0_1px_1px]" data-name="Grid Lines">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between py-[4px] relative size-full">
        <div
          className="bg-[rgba(195,198,215,0.1)] h-px relative shrink-0 w-full"
          data-name="Horizontal Divider"
        />
        <div
          className="bg-[rgba(195,198,215,0.1)] h-px relative shrink-0 w-full"
          data-name="Horizontal Divider"
        />
        <div
          className="bg-[rgba(195,198,215,0.1)] h-px relative shrink-0 w-full"
          data-name="Horizontal Divider"
        />
        <div
          className="bg-[rgba(195,198,215,0.1)] h-px relative shrink-0 w-full"
          data-name="Horizontal Divider"
        />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Glucose</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative self-stretch shrink-0"
      data-name="Container"
    >
      <div
        className="bg-[#004ac6] relative rounded-[9999px] shrink-0 size-[12px]"
        data-name="Background"
      />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Protein</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative self-stretch shrink-0"
      data-name="Container"
    >
      <div
        className="bg-[#006b5f] relative rounded-[9999px] shrink-0 size-[12px]"
        data-name="Background"
      />
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">pH</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative self-stretch shrink-0"
      data-name="Container"
    >
      <div
        className="bg-[#943700] relative rounded-[9999px] shrink-0 size-[12px]"
        data-name="Background"
      />
      <Container33 />
    </div>
  );
}

function Legend() {
  return (
    <div className="absolute right-0 top-0" data-name="Legend">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container28 />
        <Container30 />
        <Container32 />
      </div>
    </div>
  );
}

function ChartPlaceholderWithVisualElements() {
  return (
    <div
      className="absolute content-stretch flex h-[278px] items-end justify-center left-[25px] pb-px pl-px pt-[48.31px] right-[25px] top-[105px]"
      data-name="Chart Placeholder with Visual Elements"
    >
      <div
        aria-hidden
        className="absolute border-[rgba(195,198,215,0.3)] border-b border-l border-solid inset-0 pointer-events-none"
      />
      <SvgSimulatedDataSeries />
      <GridLines />
      <Legend />
    </div>
  );
}

function HealthTrendChart8Cols() {
  return (
    <div
      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] col-[1/span_8] h-[440px] justify-self-stretch min-h-[440px] relative rounded-[12px] row-1 self-start shrink-0"
      data-name="Health Trend Chart (8 cols)"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(226,232,240,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div
        className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
        data-name="Health Trend Chart (8 cols):shadow"
      />
      <Margin />
      <Container22 />
      <ChartPlaceholderWithVisualElements />
    </div>
  );
}

function Heading2() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Heading 2"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Recent Alerts</p>
      </div>
    </div>
  );
}

function ClearAllLink() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Link"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#004ac6] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Clear all</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Heading2 />
        <ClearAllLink />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="h-[18px] relative shrink-0 w-[4px]" data-name="Icon">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="18"
            preserveAspectRatio="none"
            viewBox="0 0 4 18"
            width="4"
          >
            <path d={svgPaths.p233ed800} fill="#BA1A1A" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">High Protein Detected</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Sample #4829-B showing abnormal</p>
        <p className="leading-[20px]">protein levels (+2).</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div
      className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(67,70,85,0.6)] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">2 hours ago</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container38 />
        <Container39 />
        <Container40 />
      </div>
    </div>
  );
}

function OverlayVerticalBorder() {
  return (
    <div
      className="bg-[rgba(255,218,214,0.1)] relative rounded-[8px] shrink-0 w-full"
      data-name="Overlay+VerticalBorder"
    >
      <div
        aria-hidden
        className="absolute border-[#ba1a1a] border-l-4 border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="content-stretch flex gap-[15.99px] items-start pl-[20px] pr-[16px] py-[16px] relative size-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="h-[12px] relative shrink-0 w-[20px]" data-name="Icon">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            height="12"
            preserveAspectRatio="none"
            viewBox="0 0 20 12"
            width="20"
          >
            <path d={svgPaths.p33125000} fill="#943700" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#943700] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Elevated Glucose</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Slight elevation detected in periodic</p>
        <p className="leading-[20px]">monitoring scan.</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div
      className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(67,70,85,0.6)] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">5 hours ago</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container43 />
        <Container44 />
        <Container45 />
      </div>
    </div>
  );
}

function OverlayVerticalBorder1() {
  return (
    <div
      className="bg-[rgba(188,72,0,0.1)] relative rounded-[8px] shrink-0 w-full"
      data-name="Overlay+VerticalBorder"
    >
      <div
        aria-hidden
        className="absolute border-[#943700] border-l-4 border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="content-stretch flex gap-[15.99px] items-start pl-[20px] pr-[16px] py-[16px] relative size-full">
        <Container41 />
        <Container42 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <OverlayVerticalBorder />
        <OverlayVerticalBorder1 />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur4() {
  return (
    <div
      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] relative rounded-[12px] shrink-0 w-full"
      data-name="Overlay+Border+OverlayBlur"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(226,232,240,0.8)] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[25px] relative size-full">
        <div
          className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.01px_0_0] rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
          data-name="Overlay+Shadow"
        />
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div
      className="absolute bottom-[-15px] h-[106px] right-[-14.98px] w-[95.059px]"
      data-name="Container"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="106"
        preserveAspectRatio="none"
        viewBox="0 0 95.0588 106"
        width="95.0588"
      >
        <g id="Container" opacity="0.05">
          <path d={svgPaths.p24b78500} fill="#191B23" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Heading 3"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[20px] w-full">
        <p className="leading-[28px]">Insights AI</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] w-full">
        <p className="leading-[20px] mb-0">
          Based on recent data, overall hydration levels have
        </p>
        <p className="leading-[20px] mb-0">
          improved by 14% this week. Keep monitoring pH
        </p>
        <p className="leading-[20px]">levels during morning sessions.</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="9.33333"
        preserveAspectRatio="none"
        viewBox="0 0 9.33333 9.33333"
        width="9.33333"
      >
        <g id="Container">
          <path d={svgPaths.pce77c00} fill="#004AC6" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center pt-[16px] relative shrink-0"
      data-name="Button"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#004ac6] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Full Analysis Report</p>
      </div>
      <Container49 />
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading3 />
        <Container48 />
        <Button4 />
      </div>
    </div>
  );
}

function OverlayBorderShadowOverlayBlur() {
  return (
    <div
      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] relative rounded-[12px] shrink-0 w-full"
      data-name="Overlay+Border+Shadow+OverlayBlur"
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[25px] relative size-full">
          <Container46 />
          <Container47 />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute border border-[rgba(226,232,240,0.8)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
      />
    </div>
  );
}

function AsideRecentAlertsPanel4Cols() {
  return (
    <div
      className="col-[9/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0"
      data-name="Aside - Recent Alerts Panel (4 cols)"
    >
      <OverlayBorderOverlayBlur4 />
      <OverlayBorderShadowOverlayBlur />
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[20px] whitespace-nowrap">
          <p className="leading-[28px]">Recent Test Results</p>
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[115.67px] relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
          <p className="leading-[normal]">Search tests...</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="bg-[rgba(225,226,237,0.3)] relative rounded-[8px] shrink-0"
      data-name="Input"
    >
      <div className="content-stretch flex items-start overflow-clip pb-[11px] pl-[41px] pr-[17px] pt-[10px] relative rounded-[inherit] size-full">
        <Container52 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#c3c6d7] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function Container53() {
  return (
    <div
      className="absolute bottom-[21.43%] content-stretch flex flex-col items-start left-[12px] top-[21.43%]"
      data-name="Container"
    >
      <div className="relative shrink-0 size-[18px]" data-name="Icon">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="18"
          preserveAspectRatio="none"
          viewBox="0 0 18 18"
          width="18"
        >
          <path d={svgPaths.p8a35e00} fill="#434655" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Container"
    >
      <Input />
      <Container53 />
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[12px] relative shrink-0 w-[18px]" data-name="Container">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="12"
        preserveAspectRatio="none"
        viewBox="0 0 18 12"
        width="18"
      >
        <g id="Container">
          <path d={svgPaths.p2889b5c0} fill="#191B23" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0"
      data-name="Button"
    >
      <div
        aria-hidden
        className="absolute border border-[#c3c6d7] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <Container54 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[12px] text-center tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Filters</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container51 />
        <Button5 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div
        aria-hidden
        className="absolute border-[rgba(195,198,215,0.3)] border-b border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[25px] pt-[24px] px-[24px] relative size-full">
          <Heading4 />
          <Container50 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div
      className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[206.47px]"
      data-name="Cell"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">{`DATE & TIME`}</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div
      className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[397.94px]"
      data-name="Cell"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">TEST TYPE</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div
      className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[189.86px]"
      data-name="Cell"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">STATUS</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div
      className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative shrink-0 w-[191.03px]"
      data-name="Cell"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">RESULT REF</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div
      className="content-stretch flex flex-col items-end px-[24px] py-[16px] relative shrink-0 w-[244.69px]"
      data-name="Cell"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[12px] text-right tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">ACTION</p>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div
      className="bg-[rgba(225,226,237,0.2)] content-stretch flex items-start justify-center relative shrink-0 w-full"
      data-name="Header → Row"
    >
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
    </div>
  );
}

function Container55() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[16px] w-full">
        <p className="leading-[24px]">Oct 23, 2024</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] w-full">
        <p className="leading-[20px]">09:14 AM</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div
      className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-[206.47px]"
      data-name="Data"
    >
      <Container55 />
      <Container56 />
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[18px] relative shrink-0 w-[18.057px]" data-name="Container">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18.057 18"
        width="18.057"
      >
        <g id="Container">
          <path d={svgPaths.p269eed00} fill="#004AC6" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div
      className="bg-[#dbe1ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]"
      data-name="Background"
    >
      <Container57 />
    </div>
  );
}

function Container58() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Comprehensive Metabolic</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-center pl-[24px] relative shrink-0 w-[373.94px]"
      data-name="Data"
    >
      <Background3 />
      <Container58 />
    </div>
  );
}

function Overlay4() {
  return (
    <div
      className="bg-[rgba(0,107,95,0.1)] content-stretch flex items-start px-[12px] py-[2.5px] relative rounded-[9999px] shrink-0"
      data-name="Overlay"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">NORMAL</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div
      className="content-stretch flex flex-col items-start pb-[33.5px] pl-[48px] pr-[24px] pt-[37px] relative shrink-0 w-[213.86px]"
      data-name="Data"
    >
      <Overlay4 />
    </div>
  );
}

function Data3() {
  return (
    <div
      className="content-stretch flex flex-col items-start pb-[37px] pt-[35.5px] px-[24px] relative shrink-0 w-[191.03px]"
      data-name="Data"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">TR-9902-881</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div
      className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative shrink-0"
      data-name="Button"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#004ac6] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">View Details</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div
      className="content-stretch flex flex-col items-end pb-[30.5px] pt-[30px] px-[24px] relative shrink-0 w-[244.69px]"
      data-name="Data"
    >
      <Button6 />
    </div>
  );
}

function Row() {
  return (
    <div
      className="content-stretch flex items-center justify-center mb-[-1px] relative shrink-0 w-full"
      data-name="Row"
    >
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
    </div>
  );
}

function Container59() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[16px] w-full">
        <p className="leading-[24px]">Oct 22, 2024</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] w-full">
        <p className="leading-[20px]">04:30 PM</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="relative shrink-0 w-[206.47px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[24.5px] relative size-full">
        <Container59 />
        <Container60 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 16 20"
        width="16"
      >
        <g id="Container">
          <path d={svgPaths.p113ae80} fill="#943700" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background4() {
  return (
    <div
      className="bg-[#ffdbcd] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]"
      data-name="Background"
    >
      <Container61 />
    </div>
  );
}

function Container62() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Standard Urinalysis</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[373.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative size-full">
        <Background4 />
        <Container62 />
      </div>
    </div>
  );
}

function Overlay5() {
  return (
    <div
      className="bg-[rgba(255,218,214,0.5)] content-stretch flex items-start px-[12px] py-[2.5px] relative rounded-[9999px] shrink-0"
      data-name="Overlay"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">ABNORMAL</p>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[213.86px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[33.5px] pl-[48px] pr-[24px] pt-[37.5px] relative size-full">
        <Overlay5 />
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[191.03px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[37px] pt-[36px] px-[24px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">TR-8812-442</p>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div
      className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative shrink-0"
      data-name="Button"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#004ac6] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">View Details</p>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[244.69px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[30.5px] relative size-full">
        <Button7 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div
      className="content-stretch flex items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full"
      data-name="Row"
    >
      <div
        aria-hidden
        className="absolute border-[rgba(195,198,215,0.2)] border-solid border-t inset-0 pointer-events-none"
      />
      <Data5 />
      <Data6 />
      <Data7 />
      <Data8 />
      <Data9 />
    </div>
  );
}

function Container63() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[16px] w-full">
        <p className="leading-[24px]">Oct 21, 2024</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] w-full">
        <p className="leading-[20px]">11:05 AM</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[206.47px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[24px] relative size-full">
        <Container63 />
        <Container64 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[18px] relative shrink-0 w-[18.057px]" data-name="Container">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18.057 18"
        width="18.057"
      >
        <g id="Container">
          <path d={svgPaths.p269eed00} fill="#004AC6" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div
      className="bg-[#dbe1ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[32px]"
      data-name="Background"
    >
      <Container65 />
    </div>
  );
}

function Container66() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#191b23] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Post-Op Screening</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[373.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative size-full">
        <Background5 />
        <Container66 />
      </div>
    </div>
  );
}

function Overlay6() {
  return (
    <div
      className="bg-[rgba(0,107,95,0.1)] content-stretch flex items-start px-[12px] py-[2.5px] relative rounded-[9999px] shrink-0"
      data-name="Overlay"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#006b5f] text-[11px] whitespace-nowrap">
        <p className="leading-[16.5px]">NORMAL</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[213.86px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[33px] pl-[48px] pr-[24px] pt-[37.5px] relative size-full">
        <Overlay6 />
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[191.03px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[36.5px] pt-[36px] px-[24px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">TR-7721-098</p>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div
      className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative shrink-0"
      data-name="Button"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#004ac6] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">View Details</p>
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[244.69px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[30px] pt-[30.5px] px-[24px] relative size-full">
        <Button8 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div
      className="content-stretch flex items-center justify-center pt-px relative shrink-0 w-full"
      data-name="Row"
    >
      <div
        aria-hidden
        className="absolute border-[rgba(195,198,215,0.2)] border-solid border-t inset-0 pointer-events-none"
      />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
      <Data14 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0 w-full"
      data-name="Body"
    >
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <HeaderRow />
        <Body />
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div
      className="content-stretch flex flex-col items-center justify-center py-[8px] relative shrink-0"
      data-name="Button"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Load more results...</p>
      </div>
    </div>
  );
}

function Overlay7() {
  return (
    <div
      className="bg-[rgba(225,226,237,0.1)] relative shrink-0 w-full"
      data-name="Overlay"
    >
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center p-[16px] relative size-full">
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function TableRecentTestResults12Cols() {
  return (
    <div
      className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] col-[1/span_12] justify-self-stretch relative rounded-[12px] row-2 self-start shrink-0"
      data-name="Table: Recent Test Results (12 cols)"
    >
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <HorizontalBorder />
        <Table />
        <Overlay7 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[rgba(226,232,240,0.8)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
      />
    </div>
  );
}

function MainContentAreaBentoGridLayout() {
  return (
    <div
      className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[__552px_491px] relative shrink-0 w-full"
      data-name="Main Content Area: Bento Grid Layout"
    >
      <HealthTrendChart8Cols />
      <AsideRecentAlertsPanel4Cols />
      <TableRecentTestResults12Cols />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[inherit] pb-[48px] pt-[96px] px-[24px] relative size-full">
        <WelcomeHeader />
        <SectionSummaryCardsGrid />
        <MainContentAreaBentoGridLayout />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative size-full whitespace-nowrap">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#004ac6] text-[20px]">
          <p className="leading-[28px]">StripeSense</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#434655] text-[14px]">
          <p className="leading-[20px]">© 2024 StripeSense AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Link"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Privacy</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Link"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Terms</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative self-stretch shrink-0"
      data-name="Link"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Documentation</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Link1 />
        <Link2 />
        <Link3 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div
      className="bg-[#faf8ff] max-w-[1280px] relative shrink-0 w-full"
      data-name="Footer"
    >
      <div
        aria-hidden
        className="absolute border-[rgba(195,198,215,0.2)] border-solid border-t inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] pb-[32px] pl-[24px] pr-[23.99px] pt-[33px] relative size-full">
          <Paragraph />
          <Container67 />
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Container"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#004ac6] text-[20px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[28px]">StripeSense</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <Link
      to="/dashboard"
      className="content-stretch flex flex-col items-start pb-[6px] relative shrink-0"
      data-name="Link"
    >
      <div
        aria-hidden
        className="absolute border-[#004ac6] border-b-2 border-solid inset-0 pointer-events-none"
      />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#004ac6] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Dashboard</p>
      </div>
    </Link>
  );
}

function Link5() {
  return (
    <Link
      to="/history"
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Link"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">History</p>
      </div>
    </Link>
  );
}

function Link6() {
  return (
    <Link
      to="/analysis"
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Link"
    >
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#434655] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Analysis</p>
      </div>
    </Link>
  );
}

function Nav() {
  return (
    <div
      className="content-stretch flex gap-[24px] items-center relative shrink-0"
      data-name="Nav"
    >
      <Link4 />
      <Link5 />
      <Link6 />
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-center relative size-full">
        <Container69 />
        <Nav />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 16 20"
        width="16"
      >
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="#434655" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div
      className="content-stretch flex flex-col items-center justify-center pb-[14px] pt-[8px] px-[8px] relative rounded-[8px] shrink-0"
      data-name="Button"
    >
      <Container71 />
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="20"
        preserveAspectRatio="none"
        viewBox="0 0 20.1 20"
        width="20.1"
      >
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="#434655" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div
      className="content-stretch flex flex-col items-center justify-center pb-[14px] pt-[8px] px-[8px] relative rounded-[8px] shrink-0"
      data-name="Button"
    >
      <Container72 />
    </div>
  );
}

function Ab6AXuB2JWoa5YJeRf1N8NBsgNsxfuxw57HWkCvGjxDoKDspCvMgqFp9QiNsFWaMzqGpLMtPUrmBAaVhoczO79IFxfY5UOimk9M2PYxpijh2H9QHa7Meijak2BAYu4AkE8UsNlBkZbtf8Oo4EC5PKllc2LhieHzAhukovLPn9NwO1NafTdtKl6DLge6EulQbmyrGlDCmCz7Cp5QTYhlqnIvbaZj06Kg0FwYt0H3ZPAle2U49RG() {
  return (
    <div
      className="flex-[1_0_0] min-h-px relative w-full"
      data-name="AB6AXuB2jWoa5YJeRF_1n8nBSGNsxfuxw57hWkCV_gjxDoKDspCVMgqFP9QiNsFWaMzqGp-lMtPUrmBAaVhoczO79iFxfY5UOimk9M2pYXPIJH2h-9q_HA7meijak2bAYu4AkE8UsNlBK_Zbtf8OO4E-c5PKllc2lhieHzAhukovLPn9nwO1NAFTdtKL6dLge6_EULQbmyrGlDCmCz7cp5qT-YhlqnIVBAZj06kg0fwYt0h3zP-Ale2U49rG"
    >
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          className="absolute h-[179.02%] left-0 max-w-none top-[-39.51%] w-full"
          src={
            imgAb6AXuB2JWoa5YJeRf1N8NBsgNsxfuxw57HWkCvGjxDoKDspCvMgqFp9QiNsFWaMzqGpLMtPUrmBAaVhoczO79IFxfY5UOimk9M2PYxpijh2H9QHa7Meijak2BAYu4AkE8UsNlBkZbtf8Oo4EC5PKllc2LhieHzAhukovLPn9NwO1NafTdtKl6DLge6EulQbmyrGlDCmCz7Cp5QTYhlqnIvbaZj06Kg0FwYt0H3ZPAle2U49RG
          }
        />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div
      className="bg-[#dbe1ff] relative rounded-[9999px] shrink-0 size-[32px]"
      data-name="Background+Border"
    >
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Ab6AXuB2JWoa5YJeRf1N8NBsgNsxfuxw57HWkCvGjxDoKDspCvMgqFp9QiNsFWaMzqGpLMtPUrmBAaVhoczO79IFxfY5UOimk9M2PYxpijh2H9QHa7Meijak2BAYu4AkE8UsNlBkZbtf8Oo4EC5PKllc2LhieHzAhukovLPn9NwO1NafTdtKl6DLge6EulQbmyrGlDCmCz7Cp5QTYhlqnIvbaZj06Kg0FwYt0H3ZPAle2U49RG />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#737686] border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Button10 />
        <Button11 />
        <BackgroundBorder />
      </div>
    </div>
  );
}

function HeaderTopNavigation() {
  return (
    <div
      className="absolute backdrop-blur-[6px] bg-[rgba(250,248,255,0.8)] content-stretch flex h-[64px] items-center justify-between left-0 max-w-[1280px] pb-px px-[24px] top-0 w-[1280px]"
      data-name="Header - Top Navigation"
    >
      <div
        aria-hidden
        className="absolute border-[rgba(195,198,215,0.3)] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      />
      <Container68 />
      <Container70 />
    </div>
  );
}

export default function HtmlBody() {
  return (
    <div
      className="content-stretch flex flex-col gap-[48px] items-start relative size-full"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgb(250, 248, 255) 0%, rgb(250, 248, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
      }}
      data-name="Html → Body"
    >
      <Main />
      <Footer />
      <HeaderTopNavigation />
    </div>
  );
}
