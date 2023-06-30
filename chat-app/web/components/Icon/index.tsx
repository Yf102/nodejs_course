import Image from 'next/image'

type IconType = {
  icon: string
  className?: string
  width: number
  height: number
  priority?: boolean
}

const Icon = ({
  icon,
  width,
  height,
  className = '',
  priority = true,
}: IconType) => {
  const imageSrc = `/icons/${icon}.svg`
  return (
    <Image
      src={imageSrc}
      width={width}
      height={height}
      alt=''
      priority={priority}
      className={className}
    />
  )
}

export default Icon
