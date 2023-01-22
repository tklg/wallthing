import { ModuleType } from '#/Module';
import { AppButton } from '@/components/AppButton';
import { useModuleConfigCreate } from '@/hooks';
import { moduleMap } from '@/utils/moduleMap';
import { mdiCodeTags } from '@mdi/js';
import { Card, Container, Grid, Modal, Text } from '@nextui-org/react';
import { FC, useCallback, useId } from 'react';
import styles from './index.module.scss'

const moduleOptions = Object.keys(moduleMap).map((key) => {
  const component = moduleMap[key as ModuleType]
  return {
    type: key as ModuleType,
    name: component?.moduleName,
    icon: component?.moduleIconPath,
    description: component?.moduleDescription
  }
})

interface AddModuleModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddModuleModal: FC<AddModuleModalProps> = ({ open, onClose }) => {
  const nsid = useId()
  const createModule = useModuleConfigCreate()

  const handleCreate = useCallback(async (type: ModuleType) => {
    await createModule(type)
    onClose()
  }, [])

  return (
    <Modal
      open={open}
      onClose={onClose}
      blur
      scroll
      width="600px"
    >
      <Modal.Header>
        <Text size={18}>Add a new module</Text>
      </Modal.Header>
      <Modal.Body className={styles.addModules}>
        <Grid.Container gap={2} justify='center'>
          {moduleOptions.map(({ type, name, icon, description }, i) => (
            <Grid sm={12} md={6} key={`${name}-${i}`}>
              <Card
                className={styles.card}
                isPressable
                variant='bordered'
                onPress={() => handleCreate(type)}
              >
                <Card.Header className={styles.cardHeader}>
                  <Container
                    className={styles.icon}
                    style={{ clipPath: `url(#icon-${nsid}-${i})` }}
                   >
                    {<SvgClipPath path={icon ?? mdiCodeTags} id={`icon-${nsid}-${i}`} />}
                  </Container>
                  <Text className={styles.name} size='$lg'>
                    {name ?? 'Unknown Module'}
                  </Text>
                </Card.Header>
                <Card.Body className={styles.cardBody}>
                  <Text color='$textLight'>{description}</Text>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </Modal.Body>
      <Modal.Footer>
        <AppButton light onPress={onClose}>
          Cancel
        </AppButton>
      </Modal.Footer>
    </Modal>
  )
}

interface SvgClipPathProps {
  path: string;
  id?: string;
}
const SvgClipPath: FC<SvgClipPathProps> = ({ path, id }) => (
  <svg viewBox='0 0 24 24' role='presentation'>
    {/* <path style={{ fill: 'currentcolor' }} d={path} /> */}
    <clipPath id={id}>
      <path style={{ fill: 'currentcolor' }} d={path} />
    </clipPath>
  </svg>
)
