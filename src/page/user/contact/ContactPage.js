import React from 'react'
import "./ContactPage.css"
function ContactPage() {
  return (
    <div className="contact-container">
      <div className='contact-content'>
        <h1>Trang liên hệ</h1>
        <p>Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, vui lòng điền vào biểu mẫu dưới đây và chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
        <form className='card-form'>
          <h3>Nhập thông tin liên hệ</h3>
          <div className="form-group">
            <label htmlFor="name">Tên</label>
            <input
              type="text"
              id="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Tin nhắn</label>
            <textarea
              id="message"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Gửi</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;