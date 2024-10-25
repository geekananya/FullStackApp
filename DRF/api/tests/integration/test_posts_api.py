from datetime import datetime

from django.contrib.auth.models import User
from django.http import Http404
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import get_object_or_404
from rest_framework.test import APITestCase

from api.models import Posts


class PostsTests(APITestCase):

    fixtures = ['posts.json']   # Loads data to test db

    def setUp(self):
        # Create a user for testing
        self.user = User.objects.create_user(
            username='lauren',
            password='secret'
        )
        self.token = Token.objects.create(user=self.user)

    def test_create(self):
        self.client.force_authenticate(user=self.user)

        url = reverse('addpost')
        data = {
            'body': "A brand new day",
            'tag': 'positive'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(response.data.get('author_username'), 'lauren')


    def test_get_post(self):

        url = reverse('getpost', kwargs={'pk': 7})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('body'), "Today is a good day for volleyball.")


        #invalid post id
        url2 = reverse('getpost', kwargs={'pk': 107})
        response = self.client.get(url2)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_search_posts(self):

        url = reverse('search', kwargs={'tag': 'weather'})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)


    def test_update(self):
        self.client.force_authenticate(user=self.user)

        url = reverse('updatepost', kwargs={'pk': 6})
        data = {
            'body': "Good day today... Enjoying the sunny weather!!",
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)