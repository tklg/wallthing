import { AppButton, AppButtonProps } from '@/components/AppButton';
import { Grid, Popover, PressEvent, Row, Text } from '@nextui-org/react';
import { FC, useCallback, useState } from 'react';

interface ConfirmationButtonProps extends Omit<AppButtonProps, 'onPress'> {
  confirmationText?: string;
  confirmationDescription?: string;
  actionText?: string;
  onPressConfirm: (e: PressEvent) => void;
}

export const ConfirmationButton: FC<ConfirmationButtonProps> = ({
  children,
  confirmationText = 'Confirm',
  confirmationDescription = 'Are you sure?',
  actionText = 'Delete',
  onPressConfirm,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  const handleConfirm = useCallback((e: PressEvent) => {
    setOpen(false)
    onPressConfirm(e)
  }, [onPressConfirm])

  return (
    <Popover isOpen={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <AppButton {...props}>{children}</AppButton>
      </Popover.Trigger>
      <Popover.Content>
        <Grid.Container css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
          <Row justify='center' align='center'>
            <Text b>{confirmationText}</Text>
          </Row>
          <Row>
            <Text>{confirmationDescription}</Text>
          </Row>
          <Grid.Container justify='space-between' alignContent='center'>
            <Grid>
              <AppButton size='sm' light auto={false} onPress={() => setOpen(false)}>
                Cancel
              </AppButton>
            </Grid>
            <Grid>
              <AppButton size='sm' shadow auto={false} color='error' onPress={handleConfirm}>
                {actionText}
              </AppButton>
            </Grid>
          </Grid.Container>
        </Grid.Container>
      </Popover.Content>
    </Popover>
  )
}
