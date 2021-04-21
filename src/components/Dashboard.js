import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import UploadForm from "./UploadForm"
import ImageGrid from "./ImageGrid"
import UploadFormOfficer from "./UploadFormOfficer"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (

    <>
      <div>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                  Update Profile
          </Link>
              </Card.Body>
            </Card>
          </div>
        </Container>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
        </Button>
        </div>
      </div>
      <Card>
        <h2 className="text-center mb-4 mt-4">Upload images to gallery!</h2>
        <UploadForm collection_path='Gallery' />
        <ImageGrid collection_path='Gallery' />
      </Card>
      <Card>
        <h2 className="text-center mb-4 mt-4">Upload images to Impacts!</h2>
        <UploadForm collection_path='Impacts' />
        <ImageGrid collection_path='Impacts' />
      </Card>
      <Card>
        <h2 className="text-center mb-4 mt-4">Upload new Officers!</h2>
        <UploadFormOfficer collection_path='Officers' />
        <ImageGrid collection_path='Officers' />
      </Card>
    </>

  )
}
