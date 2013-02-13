"""
Each file that starts with test... in this directory is scanned for subclasses of unittest.TestCase or testLib.RestTestCase
"""

import unittest
import os
import testLib

class TestAddSameUser(testLib.RestTestCase):
    """Issue a REST API request to add the same user twice, and analyze the result"""
    def assertFirstResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)
    def assertSecondResponse(self, respData, errCode = testLib.RestTestCase.ERR_USER_EXISTS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        self.assertDictEqual(expected, respData)
    def testAdd1(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertFirstResponse(respData, count = 1)
    def testAddSame(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertSecondResponse(respData)
      
class TestAddBadUserPassword(testLib.RestTestCase):
    """Issue a REST API request to add the same user twice, and analyze the result"""
    def assertBadUserResponse(self, respData, errCode = testLib.RestTestCase.ERR_BAD_USERNAME):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        self.assertDictEqual(expected, respData)
    def assertBadPasswordResponse(self, respData, errCode = testLib.RestTestCase.ERR_BAD_PASSWORD):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        self.assertDictEqual(expected, respData)
    def testAddEmptyUser(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : '', 'password' : 'password'} )
        self.assertBadUserResponse(respData)
    def testAddNullUser(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : None, 'password' : 'password'} )
        self.assertBadUserResponse(respData)
    def testAddEmptyPassword(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', '' : 'password'} )
        self.assertBadPasswordResponse(respData)
    def testAddNullPassword(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', None : 'password'} )
        self.assertBadPasswordResponse(respData)

class TestLoginThatExists(testLib.RestTestCase):
    """Test login"""
    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testLogin1(self):
        #add user
        sameUserTest = TestAddSameUser()
        sameUserTest.testAdd1();
        #test login
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 2)
    def testLogin2(self):
        #add user
        sameUserTest = TestAddSameUser()
        sameUserTest.testAdd1();
        #test login
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData, count = 3)

class TestLoginThatDoesNotExist(testLib.RestTestCase):
    """Test login"""
    def assertResponse(self, respData, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        self.assertDictEqual(expected, respData)

    def testLoginShouldFail(self):
        #add user
        sameUserTest = TestAddSameUser()
        sameUserTest.testAdd1();
        #test login
        respData = self.makeRequest("/users/login", method="POST", data = { 'user9' : 'user1', 'password' : 'password'} )
        self.assertResponse(respData)

