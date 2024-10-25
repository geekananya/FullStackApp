from django.http import Http404
from django.urls import reverse
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class UsersTests(APITestCase):

    fixtures = ['users.json']   # Loads data to test db

    def test_register(self):

        url = reverse('register')
        data = {
            'first_name': 'test',
            'last_name': 'user',
            'email': 'test@user.com',
            'username': 'test',
            'password': 'test'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user = User.objects.get(username=data['username'])
        self.assertEqual(user.first_name, 'test')
        self.assertEqual(user.last_name, 'user')
        self.assertEqual(user.email, 'test@user.com')
        self.assertTrue(user.check_password('test'))

        self.assertIsNot(response.data.get('token'), "" or None)



    def test_get_users(self):

        self.client.login(username='lauren', password='secret')

        url = reverse('getusers')
        response = self.client.get(url)



        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)


    def test_delete_users(self):

        url = reverse('deleteuser', kwargs={'pk': 3})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        with self.assertRaises(Http404):
            get_object_or_404(User, pk=3)