import { memo } from 'react'

const SvgIcons = () => {
  return (
    <svg
      style={{ width: 0, height: 0, position: 'absolute', zIndex: -1 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <symbol
        id={'arrow-down'}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z"
          fill="#0D0F10"
        />
      </symbol>
      <symbol
        id={'arrow-down-purple'}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z"
          fill="#8338EC"
        />
      </symbol>
      <symbol
        id={'x'}
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 4L3.5 11"
          stroke="#343A40"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.5 4L10.5 11"
          stroke="#343A40"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </symbol>
    </svg>
  )
}

export default memo(SvgIcons)
