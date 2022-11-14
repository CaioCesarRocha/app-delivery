import { CaretDoubleRight, CaretDoubleLeft } from 'phosphor-react';
import  useDeliverys from '../../../hooks/useDeliverys';
import useAuth from '../../../hooks/useAuth';
import { ButtonPage } from './styles';

export function ButtonPagination() {
  const {deliverys, page, handlePagination} = useDeliverys();
  const { user } = useAuth()
  const numberMaxDelivery = 5

  async function handleLoadDeliverys(page: number): Promise<void> {
    if (user?.typeUser === 'client') await handlePagination(page, 'client')
    if (user?.typeUser === 'deliveryman')
      await handlePagination(page, 'deliveryman')
  }

  return (
    <>
      {deliverys.length === numberMaxDelivery ? (
        <ButtonPage onClick={() => handleLoadDeliverys(5)} variant="right">
          <CaretDoubleRight size={35} />
        </ButtonPage>
      ) : null}
      {page > 0 ? (
        <ButtonPage onClick={() => handleLoadDeliverys(-5)} variant="left">
          <CaretDoubleLeft size={35} />
        </ButtonPage>
      ) : null}
    </>
  )
}
