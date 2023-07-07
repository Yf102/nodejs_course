import Modal from 'components/Modal/Modal'
import { UserType } from 'types/User'
import styles from './UsersModal.module.scss'
type UsersModalType = {
  users: UserType[]
}
const UsersModal = ({ users }: UsersModalType) => {
  return (
    <Modal
      targetModal='users-modal'
      allowClickOutside={true}
      allowClose={true}
      responsive={true}
      scroll={true}
      heading='Users'
    >
      <div className='w-full'>
        {users.map((user, index) => (
          <p key={index} className={styles.singleName}>
            {user.username}
          </p>
        ))}
      </div>
    </Modal>
  )
}

export default UsersModal
