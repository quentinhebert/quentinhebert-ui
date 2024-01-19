import { useContext, useEffect } from "react"
import CreateOrderItemForm from "../../../../../Forms/orders/create-order-item-form"
import EditOrderItemForm from "../../../../../Forms/orders/edit-order-item-form"
import { Context, MODALS } from "../../../module"
import FormSave from "./modal-save"
import CustomModal from "../../../../../Modals/custom-modal"
import { ModalTitle } from "../../../../../Modals/Modal-Components/modal-title"
import CustomForm from "../../../../../Forms/custom-form"
import FormClient from "./modal-client"

export default function Modals() {
  const { state, handleCloseModal } = useContext(Context)
  return (
    <CustomModal open={state.openModal} handleClose={handleCloseModal} gap={4}>
      <ModalContent />
    </CustomModal>
  )
}

function ModalContent() {
  const { state } = useContext(Context)
  switch (state.modal) {
    case MODALS.CREATE_ITEM:
      return (
        <CreateOrderItemForm
          noVat={order.no_vat}
          handleClose={handleCloseModal}
          items={items}
          setItems={setItems}
          handleDetectChange={handleDetectChange}
        />
      )
    case MODALS.EDIT_ITEM:
      return (
        <EditOrderItemForm
          noVat={order.no_vat}
          handleClose={handleCloseModal}
          items={items}
          setItems={setItems}
          itemIndex={selectedItemIndex}
          incomingItem={selectedItem}
          handleDetectChange={handleDetectChange}
        />
      )
    case MODALS.SAVE:
      return <FormSave />
    case MODALS.SEND:
      return (
        <>
          <ModalTitle>Envoyer le devis</ModalTitle>
          {!!selectedQuotation?.recipient_emails?.length && (
            <AlertInfo
              content={{
                show: true,
                js: (
                  <span>
                    Vous avez déjà envoyé le devis à :
                    <ul>
                      {selectedQuotation.recipient_emails.map((email, key) => (
                        <>
                          <Box
                            key={key}
                            component="li"
                            onClick={() => setEmailInput(email)}
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              "&:hover": {
                                color: (theme) => theme.palette.text.secondary,
                              },
                            }}
                          >
                            {email}
                          </Box>
                        </>
                      ))}
                    </ul>
                  </span>
                ),
              }}
            />
          )}
          <CustomForm gap={4}>
            {!!selectedQuotation?.client?.email && (
              <>
                <PillButton
                  textTransform="capitalize"
                  onClick={() => {
                    handleSend(
                      selectedQuotation.id,
                      selectedQuotation.client.email
                    )
                  }}
                >
                  Envoyer à <br />
                  {selectedQuotation.client.email}
                </PillButton>
                <BodyText>ou</BodyText>
              </>
            )}

            <CustomFilledInput
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              label="Destinataire (e-mail)"
              error={emailError}
              helperText={emailError && "Adresse e-mail invalide"}
            />
            <Stack className="row" gap={2}>
              <CancelButton handleCancel={handleCloseModal} />
              <PillButton
                type="submit"
                onClick={() => handleSend(selectedQuotation.id)}
              >
                Envoyer
              </PillButton>
            </Stack>
          </CustomForm>
        </>
      )
    case MODALS.ASSIGN:
      return <FormClient />
    case MODALS.PAYMENT:
      return (
        <>
          <ModalTitle>Envoyer un lien de paiement</ModalTitle>
          <CustomForm gap={4}>
            <CustomFilledInput
              value={paymentEmail}
              onChange={(e) => setPaymentEmail(e.target.value)}
              label="Destinataire (e-mail)"
              error={emailError} // FIXME: email error is not correct => need to separate logic for different emails
              helperText={emailError && "Adresse e-mail invalide"}
            />
            <Stack className="row" gap={2} alignItems="center">
              <CancelTextButton handleCancel={handleCloseModal} />
              <PillButton onClick={generatePaymentLink}>Envoyer</PillButton>
            </Stack>
          </CustomForm>
        </>
      )
    case MODALS.TAG:
      return (
        <>
          <ModalTitle alignItems="center" display="flex" gap={1}>
            <DoneIcon /> Marquer le prochain paiement comme réglé
          </ModalTitle>
          <BodyText preventTransition fontSize="1rem">
            Quel a été le moyen de paiement utilisé ?
          </BodyText>

          <CustomForm gap={4}>
            <CustomRadio
              options={PAYMENT_OPTIONS}
              setValue={setPaymentMethod}
            />

            <Stack className="row" gap={2} alignSelf="end" alignItems="center">
              <CancelTextButton handleCancel={handleCloseModal} />
              <PillButton onClick={handleTag} disabled={processing}>
                {processing ? "Patientez..." : "Marquer comme payé"}
              </PillButton>
            </Stack>
          </CustomForm>
        </>
      )
  }
}
