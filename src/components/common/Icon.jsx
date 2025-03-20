import { memo } from 'react'

const Icon = ({ name, viewBox, onClick, ...rest }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 18 18'}
      xmlns="http://www.w3.org/2000/svg"
      role={onClick ? 'button' : 'img'}
      onClick={onClick}
      {...rest}
    >
      <use xlinkHref={`#${name}`} href={`#${name}`} />
    </svg>
  )
}

export default memo(Icon)
