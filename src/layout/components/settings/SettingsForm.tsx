import React, { useRef } from 'react';

import { Form, Select, Switch, Button } from 'antd';

import ColorPicker from '../../../ui/color-picker/ColorPicker';
import { history } from '../../../redux/store';

import { IAppSettings } from '../../../interfaces/settings';

import './SettingsForm.scss';

type Props = {
  settings: IAppSettings;
  onResetSettings: () => void;
  onUpdateSetting: (settings: IAppSettings) => void;
};

const SettingsForm = ({ settings, onResetSettings, onUpdateSetting }: Props) => {
  const downloadLink = useRef<HTMLAnchorElement>(null);
  const { boxed, sidebarBg, topbarBg } = settings;

  const layoutUrl = history.location.pathname.split('/')[1];

  const handleReset = () => {
    onResetSettings();
  };

  const handleDownload = () => {
    const settingsJSON = JSON.stringify(settings);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(settingsJSON);

    downloadLink.current.setAttribute('href', dataStr);
    downloadLink.current.setAttribute('download', 'settings.json');
    downloadLink.current.click();
  };

  const setValue = (name: string, value: any) => {
    onUpdateSetting({ ...settings, [name]: value });
  };

  const handleLayoutChange = (type: string) => {
    const currentRoute = history.location.pathname.split('/')[2];

    history.push(`/${type}/${currentRoute}`);
    setValue('layout', type);
  };

  const handleSideBgChange = ({ color, contrast }) =>
    onUpdateSetting({ ...settings, sidebarBg: color, sidebarColor: contrast });

  const handleNavBgChange = ({ color }) => setValue('topbarBg', color);
  const handleBoxedChange = (boxed: boolean) => setValue('boxed', boxed);

  const sidebarPickerLabel =
    layoutUrl === 'vertical' ? 'Sidebar background' : 'Second navbar background';

  return (
    <Form layout='vertical' className='settings-form'>
      <Form.Item label='Topbar background'>
        <ColorPicker onColorChange={handleNavBgChange} color={topbarBg} />
      </Form.Item>

      <Form.Item label={sidebarPickerLabel}>
        <ColorPicker onColorChange={handleSideBgChange} color={sidebarBg} />
      </Form.Item>

      <Form.Item label='Layout'>
        <Select onChange={handleLayoutChange} defaultValue={layoutUrl}>
          <Select.Option value={'vertical'}>Vertical</Select.Option>

          <Select.Option value={'horizontal'}>Horizontal</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label='Boxed'>
        <Switch onChange={handleBoxedChange} checked={boxed} />
      </Form.Item>

      <div className='d-flex justify-content-between buttons-list settings-actions'>
        <Button danger onClick={handleReset}>
          Reset to default
        </Button>

        <Button type='primary' onClick={handleDownload}>
          Download settings
        </Button>
      </div>
      <a href='#' ref={downloadLink} style={{ display: 'none' }} />
    </Form>
  );
};

export default SettingsForm;
