import { Module } from '#/Module';
import { AppButton } from '@/components/AppButton';
import { moduleMap } from '@/utils/moduleMap';
import { useModuleConfig, useModuleConfigEditing, useModuleConfigs } from '@/hooks';
import { Modal, Text } from '@nextui-org/react';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form'
import styles from './index.module.scss'
import { ValueType } from '#/ModuleConfig';

interface ModuleConfigurationProps {}

export const ModuleConfiguration: FC<ModuleConfigurationProps> = () => {
  const modules = useModuleConfigs()
  const [editingId, setEditingId] = useModuleConfigEditing()
  const [moduleConfig, setModuleConfigValues] = useModuleConfig(editingId)
  const editingModule = useMemo(() => modules.find(m => m.id === editingId), [editingId])
  const moduleName = useMemo(() => editingModule ? moduleMap[editingModule?.type]?.moduleName : '', [editingModule?.type])
  const moduleFormItems = useMemo(() => editingModule ? moduleMap[editingModule?.type]?.configFormItems : [], [editingModule?.type])
  const formMethods = useForm<Record<string, ValueType>>({
    defaultValues: {}
  })

  useEffect(() => {
    if (moduleConfig && editingId) {
      formMethods.reset({
        ...moduleConfig.values
      })
    }
  }, [formMethods.reset, editingId, moduleConfig])

  const handleClose = useCallback(() => {
    setEditingId(undefined)
    formMethods.reset()
  }, [formMethods.reset])

  const handleSave = useCallback((newValues: Record<string, ValueType>) => {
    setModuleConfigValues(newValues)
    handleClose()
  }, [setModuleConfigValues, handleClose])

  return (    
    <Modal
      open={Boolean(editingId)}
      blur
      onClose={handleClose}
    >
      <Modal.Header>
        <Text size={18}>Configure <strong>{moduleName}</strong></Text>
      </Modal.Header>
      <Modal.Body className={styles.moduleConfiguration}>
        <FormProvider {...formMethods}>
          {moduleFormItems?.map(({
            id, 
            label, 
            description, 
            placeholder, 
            defaultValue, 
            InputComponent
           }) => (
            <InputComponent 
              key={id} 
              label={label}
              name={id} 
              placeholder={placeholder}
            />
          ))}
        </FormProvider>
      </Modal.Body>
      <Modal.Footer>
        <AppButton light onPress={handleClose}>
          Cancel
        </AppButton>
        <AppButton onPress={() => formMethods.handleSubmit(handleSave)()}>
          Save
        </AppButton>
      </Modal.Footer>
    </Modal>
  )
}
