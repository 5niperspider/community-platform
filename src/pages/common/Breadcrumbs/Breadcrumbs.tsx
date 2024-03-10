import { Text } from 'theme-ui'

import { BreadcrumbItem } from './BreadcrumbsItem'

const MAX_LENGTH = 38

type step = { text: string; link?: string } | null
interface BreadcrumbsProps {
  steps: Array<step>
}

const calculateBreadcrumbsLength = (steps: Array<step>) => {
  const titles_length = steps.reduce((accumulator, step) => {
    return accumulator + (step ? step.text.length : 0)
  }, 0)
  const chevrons_length = (steps.length - 1) * 3
  return titles_length + chevrons_length
}

const Chevron = () => {
  return (
    <Text sx={{ fontFamily: 'monospace', fontSize: 20, color: 'dimgray' }}>
      {'>'}
    </Text>
  )
}

export const Breadcrumbs = ({ steps }: BreadcrumbsProps) => {
  const total_length = calculateBreadcrumbsLength(steps)
  return (
    <ul style={{ margin: 20, padding: 0 }}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        const isExtreme = isLast || index == 0
        return (
          step && (
            <>
              <BreadcrumbItem
                key={index}
                text={step.text}
                link={step.link}
                isLast={isLast}
                collapse={total_length > MAX_LENGTH && !isExtreme}
              />
              {!isLast && <Chevron />}
            </>
          )
        )
      })}
    </ul>
  )
}
