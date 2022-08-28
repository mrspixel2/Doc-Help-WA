import React from 'react';

import { usePageData } from '../../../hooks/usePage';
import { usePatients } from '../../../hooks/usePatients';

import PatientsTable from '../patients/PatientsTable';

import { IPageData } from '../../../interfaces/page';
import ClassificationTable from './ClassificationsTable';

const pageData: IPageData = {
  title: 'Classifications',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Classifications'
    }
  ]
};

const ClassificationsPage = () => {
  usePageData(pageData);

  return (
    <>
      <ClassificationTable>

      </ClassificationTable>
    </>
  );
};

export default ClassificationsPage;
